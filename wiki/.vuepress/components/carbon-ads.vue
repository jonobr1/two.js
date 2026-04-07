<template>
  <div class="carbon-ads"></div>
</template>

<script>
export default {
  name: 'CarbonAds',
  watch: {
    $route(to, from) {
      if (
        to &&
        from &&
        to.path !== from.path &&
        this.$el &&
        this.$el.querySelector('#carbonads')
      ) {
        this.$el.innerHTML = '';
        this.load();
      }
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      if (typeof document === 'undefined' || !this.$el) {
        return;
      }

      const script = document.createElement('script');
      script.id = '_carbonads_js';
      script.async = true;
      script.src =
        'https://cdn.carbonads.com/carbon.js?serve=CESI52JY&placement=twojsorg';
      this.$el.appendChild(script);
    },
  },
};
</script>

<style scoped>
#carbonads * {
  margin: initial;
  padding: initial;
}

#carbonads {
  background-color: hsl(0deg 0% 98%);
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  max-width: 330px;
  overflow: hidden;
  z-index: 100;
}

#carbonads a {
  border: 0;
  color: inherit;
  font-weight: 400;
  text-decoration: none;
}

#carbonads a:hover {
  color: inherit;
}

#carbonads span {
  display: block;
  overflow: hidden;
  position: relative;
}

#carbonads .carbon-wrap {
  display: flex;
}

#carbonads .carbon-img {
  display: block;
  line-height: 1;
  margin: 0;
}

#carbonads .carbon-img img {
  display: block;
}

#carbonads .carbon-text {
  font-size: 10px;
  line-height: 1.5;
  margin-bottom: 16px;
  padding: 10px;
  text-align: left;
}

#carbonads .carbon-poweredby {
  background: #f1f1f2;
  border-top-left-radius: 3px;
  bottom: 0;
  display: block;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 1;
  padding: 6px 8px;
  position: absolute;
  right: 0;
  text-align: center;
  text-transform: uppercase;
}
</style>
