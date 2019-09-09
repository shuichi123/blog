<template>
  <div class="editor layout" :id="'edit'+editormdId">
    <link href="/static/lib/editormd/css/editormd.css" type="text/css" rel="stylesheet" />
    <el-button-group class="button-group">
      <el-button type="primary" @click="copy" ref="btn" id="btn" class="btn">常用功能</el-button>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="close">关闭</el-button>
    </el-button-group>
    <div ref="editormd" class="test-editormd" :id="editormdId">
      <textarea ref='editormdDoc' style="display: none"></textarea>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import scriptjs from 'scriptjs'
export default {
  name: 'Edit',
  methods: {
    fetchScript: function (url) {
      return new Promise((resolve) => {
        scriptjs(url, () => {
          resolve()
        })
      })
    },
    save () {
      let data = {
        csrfToken: this.csrfToken,
        article_content: this.$refs.editormdDoc.value,
      }
      //let param = new URLSearchParams()
      let param = new FormData()
      for (let key in data) {
        param.append(key, data[key])
      }
      axios.post('/api/manage/article'+this.num, param).then((res) => {
        console.log('res=>', res)
      })
    },
    close () {
      this.$emit('close')
    },
    copy () {
      
    },
  },
  props: ['editormdId', 'article_content', 'article_num'],
  components: {
  },
  computed: {
    num () {
      return this.article_num ? '?article_num='+this.article_num : ''
    }
  },
  data () {
    return {
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
    }
  },
  mounted () {
    window.testEditor = window.editormd(this.editormdId, {
      width: "95%",
      height: "95%",
      path : 'static/lib/editormd/lib/',
      //theme : "dark",
      //previewTheme : "dark",
      //editorTheme : "pastel-on-dark",
      markdown : this.article_content,    // 可以获取例如test.md的文档传进来
      codeFold : true,
      //syncScrolling : false,
      saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
      searchReplace : true,
      //watch : false,                // 关闭实时预览
      htmlDecode : "style|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
      //toolbar  : false,             //关闭工具栏
      //toolbarIcons : function() {
      //  //["undo", "redo", "|", "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|", "list-ul", "list-ol", "hr", "|", "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|", "goto-line", "watch", "preview", "fullscreen", "clear", "search", "|", "help", "info"]
      //  return ["bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
      //    "h1", "h2", "h3", "h4", "h5", "h6", "|",
      //    "hr", "code", "preformatted-text", "code-block", "table", "pagebreak", "|",
      //    "goto-line", "preview", "clear"]
      //},
      //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
      emoji : true,
      taskList : true,
      tocm            : true,         // Using [TOCM]
      tex : true,                   // 开启科学公式TeX语言支持，默认关闭
      flowChart : true,             // 开启流程图支持，默认关闭
      sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
      //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
      //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
      //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
      //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
      //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
      imageUpload : true,
      imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
      //imageUploadURL : "./php/upload.php",
      onload : function() {
        console.log('onload', this);
      }
    })
  }
}
</script>

<style scoped>
.layout{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
}
.manage-insert .manage-insert-editor.editormd.editormd-vertical{
  overflow: visiable !important;
}
.manage-insert .CodeMirror.cm-s-default.CodeMirror-wrap{
  width: 100% !important;
  height: 50% !important;
}
.manage-insert .editormd-preview{
  display: inline-block !important;
  width: 100% !important;
  height: 50% !important;
  position: relative !important;
}
.manage-insert .CodeMirror.cm-s-default.CodeMirror-wrap pre{
  margin-bottom: 0 !important;
  border: 0;
  background: white !important;
}
.manage-insert .CodeMirror-linenumber{
  word-wrap: break-word;
  word-break:keep-all;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.layout .button-group{
  position: absolute;
  right: 50px;
  bottom: 50px;
  z-index: 3;
}
</style>
