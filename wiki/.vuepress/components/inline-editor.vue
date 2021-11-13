<template>
  <div
    :data-prefill="prefill"
    data-default-tab="js,result"
    data-editable="true"
    data-height="500"
    class="codepen">

      <pre data-lang="html"></pre>
      <pre data-lang="css" data-options-autoprefixer="true"></pre>
      <pre data-lang="js" ref="pre"></pre>

  </div>

</template>

<script>

  var loaded = false;

  module.exports = {
    name: 'inline-editor',
    computed: {
      prefill() {
        var result = {};
        var props = this._props;
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
      }
    },
    props: {
      scripts: String
    },
    mounted: function() {

      var script;

      var textContent = getTextContent(this.$slots.default);
      this.$refs.pre.innerHTML = textContent;

      if (!loaded) {
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://static.codepen.io/assets/embed/ei.js';
        document.body.appendChild(script);
        loaded = true;
      }

    },
    beforeDestroyed: function() {

    }
  };

  function getTextContent(nodes) {
    var result = '';
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.children && node.children.length > 0) {
        if (result !== '') {
          result += '\n';
        }
        result += getTextContent(node.children);
        result += '\n';
      } else if (typeof node.text === 'string') {
        result += node.text;
      }
    }
    return result;
  }

</script>
