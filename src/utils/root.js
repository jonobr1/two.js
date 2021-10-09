
if (typeof window !== 'undefined') {
  const root = window;
} else if (typeof global !== 'undefined') {
  const root = global;
} else if (typeof self !== 'undefined') {
  const root = self;
}

export root;
