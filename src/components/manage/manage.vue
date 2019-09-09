<template>
  <div id="manage">
    <myContent></myContent>
    <myNav></myNav>
    <myHeader></myHeader>
  </div>
</template>

<script>
import axios from 'axios'
import scriptjs from 'scriptjs'
import myNav from '@/components/manage/Nav'
import myHeader from '@/components/manage/Header'
import myContent from '@/components/manage/Content'
import { mapState, mapMutations} from 'vueX'

export default {
  name: 'App',
  methods: {
    fetchScript: function (url) {
      return new Promise((resolve) => {
        scriptjs(url, () => {
          resolve()
        })
      })
    },
    ...mapMutations(['initManage']),
  },
  components: {
    myNav: myNav,
    myHeader: myHeader,
    myContent: myContent,
  },
  data () {
    return {
    }
  },
  created () {
    axios.get('/api/manage').then((response) => {
      this.initManage(response.data)
    })
  },
  mounted () {
    (async () => {
      let vm = this
      await this.fetchScript('/static/lib/editormd/editormd.js')
      //let editormd = this.editormdId
      this.$nextTick(() => {
        function Decorator(fnName, execute, obj=window) {
          let oldFn = obj[fnName]
          obj[fnName] = function() {
              //console.log(this) //editormd实例
              return execute.bind(this)(oldFn.bind(this))
          }
        }
        Decorator('setToolbarHandler', function (fn) {
          console.log('运行开始时间:', new Date())
          //console.log(this)//editormd实例
          let edit = this
          $('#edit'+edit.id).find(".btn").on('click', function () {
            var cm        = edit.cm;
            var cursor    = cm.getCursor();
            var selection = cm.getSelection();
            console.log(selection)
            cm.replaceSelection("<font color='red'>" + selection + "</font>");
            if(selection === "") {
                //cm.setCursor(cursor.line, cursor.ch + 2);
                console.log('空')
            }
          })
          fn()
          console.log('运行结束时间:', new Date())
        }, window.editormd.fn)
      })
    })()
    console.log('manage mounted')
  }
}
</script>

<style>
#manage{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
