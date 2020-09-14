<template>
  <div class="inline-editor">
    <div ref="editor" class="editor">
    </div>
    <div class="result">
    </div>
  </div>
</template>

<script>

  var EditorView = require('@codemirror/next/view').EditorView;
  var EditorState = require('@codemirror/next/state').EditorState;
  var BasicSetup = require('@codemirror/next/basic-setup').basicSetup;
  var JavaScriptSupport = require('@codemirror/next/lang-javascript').javascript;
  var Two = require('../../../build/two.module.js');

  module.exports = {
    name: 'inline-editor',
    props: {

    },
    mounted: function() {

      var code = getCode(this.$slots.default);

      var view = new EditorView({
        state: EditorState.create({
          doc: code,
          extensions: [
            BasicSetup.concat([
              JavaScriptSupport()
            ])
          ]
        })
      });

      this.$refs.editor.appendChild(view.dom);

    },
    beforeDestroyed: function() {

    }
  };

  function getCode(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var text = expand(item);
      result.push(text);
    }
    return result.join('\n');
  }

  function expand(elem) {
    if (elem.children && elem.children.length > 0) {
      var result = [];
      for (var i = 0; i < elem.children.length; i++) {
        var child = elem.children[i];
        result.push(expand(child));
      }
      return result.join('\n');
    } else {
      return elem.text;
    }
  }

</script>

<style lang="stylus" scoped>

  div.inline-editor {
    width: 100%;
    & > div {
      width: 50%;
    }
  }

</style>
