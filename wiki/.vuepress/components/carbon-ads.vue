<script>
  export default {
    name: 'carbon-ads',
    watch: {
      '$route' (to, from) {
        if (
          to.path !== from.path
          // Only reload if the ad has been loaded
          // otherwise it's possible that the script is appended but
          // the ads are not loaded yet. This would result in duplicated ads.
          && this.$el.querySelector('#carbonads')
        ) {
          this.$el.innerHTML = ''
          this.load()
        }
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        const s = document.createElement('script')
        s.id = '_carbonads_js'
        s.src = `//cdn.carbonads.com/carbon.js?serve=CESI52JY&placement=twojsorg`
        this.$el.appendChild(s)
      }
    },
    render (h) {
      return h('div', { class: 'carbon-ads' })
    }
  }
</script>

<style lang="stylus">

  #carbonads * {
    margin: initial;
    padding: initial;
  }

  #carbonads {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial,
      sans-serif;
  }

  #carbonads {
    display: flex;
    max-width: 330px;
    background-color: hsl(0, 0%, 98%);
    border: 1px solid #ddd;
    border-radius: 4px;
    z-index: 100;
    overflow: hidden;
  }

  #carbonads a {
    color: inherit;
    text-decoration: none;
    border: none;
    font-weight: normal;
  }

  #carbonads a:hover {
    color: inherit;
  }

  #carbonads span {
    position: relative;
    display: block;
    overflow: hidden;
  }

  #carbonads .carbon-wrap {
    display: flex;
  }

  #carbonads .carbon-img {
    display: block;
    margin: 0;
    line-height: 1;
  }

  #carbonads .carbon-img img {
    display: block;

  }

  #carbonads .carbon-text {
    font-size: 10px;
    padding: 10px;
    margin-bottom: 16px;
    line-height: 1.5;
    text-align: left;
  }

  #carbonads .carbon-poweredby {
    display: block;
    padding: 6px 8px;
    background: #f1f1f2;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    font-size: 8px;
    line-height: 1;
    border-top-left-radius: 3px;
    position: absolute;
    bottom: 0;
    right: 0;
  }

</style>
