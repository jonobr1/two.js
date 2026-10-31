/* eslint-env es6 */
import { Events } from '../events.js';

// Count assignments, not scene membership: an unrendered or removed shape can
// still use an effect. Weak keys avoid keeping shapes or effects alive here.
const references = new WeakMap();
const bindings = new WeakMap();

/**
 * @private
 * Track one property (or texture collection) without disposing replaced effects.
 * Replacing a property leaves ownership of the previous effect with the caller.
 */
export function bindEffects(shape, property, effects, handler) {
  let properties = bindings.get(shape);
  const previous = properties && properties.get(property);
  if (previous) {
    release(previous);
  }

  const unique = new Set();
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    if (effect && typeof effect === 'object') {
      unique.add(effect);
    }
  }

  // Ordinary color strings do not need ownership records.
  if (unique.size === 0) {
    if (properties) {
      properties.delete(property);
      if (properties.size === 0) {
        bindings.delete(shape);
      }
    }
    return;
  }
  if (!properties) {
    properties = new Map();
    bindings.set(shape, properties);
  }

  unique.forEach((effect) => {
    references.set(effect, (references.get(effect) || 0) + 1);
    if (handler && typeof effect.bind === 'function') {
      effect.bind(Events.Types.change, handler);
    }
  });
  properties.set(property, { effects: unique, handler });
}

/**
 * @private
 * Release a shape's assignments, then dispose each effect only if no other
 * assignments remain. Deleting the bindings first makes repeated disposal safe.
 */
export function disposeEffects(shape) {
  releaseEffects(shape, true);
}

/** @private Release assignments and listeners without disposing resources. */
export function unbindEffects(shape) {
  releaseEffects(shape, false);
}

function releaseEffects(shape, dispose) {
  const properties = bindings.get(shape);
  if (!properties) {
    return;
  }
  bindings.delete(shape);

  const effects = new Set();
  properties.forEach((binding) => {
    release(binding);
    binding.effects.forEach((effect) => effects.add(effect));
  });

  effects.forEach((effect) => {
    if (references.has(effect)) {
      return;
    }
    if (dispose && typeof effect.dispose === 'function') {
      effect.dispose();
    } else if (typeof effect.unbind === 'function') {
      effect.unbind();
    }
  });
}

function release(binding) {
  binding.effects.forEach((effect) => {
    if (binding.handler && typeof effect.unbind === 'function') {
      effect.unbind(Events.Types.change, binding.handler);
    }
    const count = references.get(effect) - 1;
    if (count > 0) {
      references.set(effect, count);
    } else {
      references.delete(effect);
    }
  });
}
