<template>
  <div id="article" :style="{}">
    <link href="/static/lib/editormd/css/editormd.css" type="text/css" rel="stylesheet" />
    <div id="doc-content">
        <textarea ref="editormdHtml" style="display:none;"></textarea>
    </div>
  </div>
</template>

<script>
import myTest from '@/components/Test'
import axios from 'axios'
import scriptjs from 'scriptjs'
import { mapState, mapMutations} from 'vueX'

export default {
  name: 'App',
  computed: {
    ...mapState(['indexData'])
  },
  methods: {
    fetchScript: function (url) {
      return new Promise((resolve) => {
        scriptjs(url, () => {
          resolve()
        })
      })
    },
    ...mapMutations(['initIndex']),
  },
  components: {
    myTest: myTest,
  },
  data () {
    return {
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
    }
  },
  mounted () {
    (async () => {
      await this.fetchScript('/static/lib/editormd/lib/marked.min.js')
      await this.fetchScript('/static/lib/editormd/lib/prettify.min.js')
      await this.fetchScript('/static/lib/editormd/lib/raphael.min.js')
      await this.fetchScript('/static/lib/editormd/lib/underscore.min.js')
      await this.fetchScript('/static/lib/editormd/lib/sequence-diagram.min.js')
      await this.fetchScript('/static/lib/editormd/lib/flowchart.min.js')
      await this.fetchScript('/static/lib/editormd/lib/jquery.flowchart.min.js')
      await this.fetchScript('/static/lib/editormd/editormd.js')
      this.$nextTick(() => {
        axios.get('/api/index/article?article_num='+this.$route.params.article_num).then((response) => {
          console.log(response.data.article[0].fields.article_content)
          this.$refs.editormdHtml.value = response.data.article[0].fields.article_content
          window.editormd.markdownToHTML("doc-content", {
            //htmlDecode: "style,script,iframe",
            htmlDecode: "style",
            emoji: true,
            taskList: true,
            tex: true, // 默认不解析
            flowChart: true, // 默认不解析
            sequenceDiagram: true, // 默认不解析
            codeFold: true
          });
        })
      })
    })()
    
  }
}
</script>

<style scoped lang="less">
#article{
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  #doc-content{
    box-sizing: border-box;
    overflow-x: hidden;
  }
}
</style>
