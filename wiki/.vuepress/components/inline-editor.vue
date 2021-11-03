<template>
  <div class="inline-editor">
    <div ref="editor" class="editor">
    </div>
    <div ref="result" class="result">
    </div>
  </div>
</template>

<script>

  var EditorView = require('@codemirror/next/view').EditorView;
  var EditorState = require('@codemirror/next/state').EditorState;
  var Two = require('../../../build/two.module.js').default;

  var EditorSetup = require('./editor-extensions').default;
  var CustomTheme = require('./editor-theme.js').default;

  module.exports = {
    name: 'inline-editor',
    props: {

    },
    mounted: function() {

      var two;
      var code = getCode(this.$slots.default);
      var container = this.$refs.result;

      var view = new EditorView({
        state: EditorState.create({
          doc: code,
          extensions: EditorSetup.concat([
            EditorView.updateListener.of(recompile),
            CustomTheme
          ])
        })
      });

      this.$refs.editor.appendChild(view.dom);

      function recompile(e) {
        if (two) {
          two.release(two.scene);
          Two.Instances.length = 0;
        }
        container.innerHTML = '';
        var source = e.view.state.doc.toString() + '\nreturn two;';
        two = new Function('Two, container', source)(Two, container);
      }

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
    display: flex;
    flex-wrap: nowrap;
    & > div {
      width: 50%;
      flex-grow: 1;
      border-top: 1px solid rgb(221, 221, 221);
      border-left: 1px solid rgb(221, 221, 221);
      border-bottom: 1px solid rgb(221, 221, 221);
    }
    div.result {
      border-right: 1px solid rgb(221, 221, 221);
      box-sizing: border-box;
    }

     @media (max-width: $MQNarrow) {
       flex-wrap: wrap;
      .editor {
        border-right: 1px solid rgb(221,221,221);
      }
      .result {
        overflow: hidden;
      }
     }
  }

</style>
