<template>
  <div
    :data-prefill="prefill"
    data-default-tab="js,result"
    data-editable="true"
    data-theme-id="40346"
    data-height="500"
    class="codepen"
  >
    <pre data-lang="html"></pre>
    <pre data-lang="css" data-options-autoprefixer="true"></pre>
    <pre data-lang="js" ref="pre"></pre>
  </div>
</template>

<script>
var beautifyOptions = {
  indent_size: 2,
};
var embedScript;
var embedInstances = 0;

export default {
  name: 'InlineEditor',
  props: {
    title: String,
    description: String,
    tags: String,
    scripts: String,
  },
  computed: {
    prefill() {
      var result = {};
      var props = this.$props;

      if (props.title) {
        result.title = props.title;
      }
      if (props.description) {
        result.description = props.description;
      }
      if (props.tags) {
        result.tags = props.tags.split(',');
      }
      if (props.scripts) {
        result.scripts = props.scripts.split(',');
      }

      return JSON.stringify(result);
    },
  },
  mounted() {
    var textContent = getTextContent(
      this.$slots.default ? this.$slots.default() : []
    );

    this.$refs.pre.textContent = textContent;

    if (typeof document === 'undefined') {
      return;
    }

    embedInstances++;

    if (!embedScript) {
      embedScript = document.createElement('script');
      embedScript.type = 'text/javascript';
      embedScript.className = 'codepen';
      embedScript.async = true;
      embedScript.src = 'https://static.codepen.io/assets/embed/ei.js';
      document.body.appendChild(embedScript);
    }
  },
  beforeUnmount() {
    embedInstances = Math.max(0, embedInstances - 1);

    if (embedInstances === 0 && embedScript) {
      if (embedScript.parentNode) {
        embedScript.parentNode.removeChild(embedScript);
      }
      embedScript = undefined;
    }
  },
};

function getTextContent(nodes) {
  var result = '';

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];

    if (!node) {
      continue;
    }

    if (Array.isArray(node)) {
      result += getTextContent(node);
      continue;
    }

    if (Array.isArray(node.children) && node.children.length > 0) {
      if (result !== '') {
        result += '\n';
      }
      result += getTextContent(node.children);
      result += '\n';
    } else if (typeof node.children === 'string') {
      result += node.children;
    } else if (typeof node.text === 'string') {
      result += node.text;
    }
  }

  if (typeof window !== 'undefined' && window.js_beautify) {
    return window.js_beautify(result, beautifyOptions);
  }

  return result;
}
</script>
