<template>
  <div ref="study" id="container-study">
    <ul>
      <li v-for="item in studydata.all" v-bind:key="item.id">
        <myContentLi v-bind:article="item"></myContentLi>
      </li>
    </ul>
  </div>
</template>

<script>
import mySecNav from '@/components/SecNav'
import myContentLi from '@/components/ContentLi'
import axios from 'axios'
import JRoll from 'JRoll'
import { mapState} from 'vueX'

var i = '    <mySecNav v-bind:secnavdata="secnavdata" @changeview="changeSectype"></mySecNav>'
export default {
  name: 'Study',
  computed: {
    ...mapState({
      studydata: (state) => state.indexData.studydata,
    })
    //...mapState(['indexData'])
  },
  mounted () {
  },
  data () {
    return {
    }
  },
  components: {
    mySecNav: mySecNav,
    myContentLi: myContentLi
  },
  created () {
  },
  methods: {
  },
  updated () {
    console.log('updated')
    let study = this.$refs.study
    let jroll = new JRoll(study, {
      scrollBarY: true
    });
    function ajax (parms) {
      var a = [],i
      var page = parms.url.replace("getData.do?page=", "")
      for (i = 1; i <= 20; i++) {
        a.push({
          "title": "全部study标题",
          "summary": "下拉刷新+无限加载",
          "time": "2019-4-24 9:23",
          "writer": "吹口琴的喵喵",
          "type": "python",
          "readers": "15"
        });
      }
      setTimeout(function() {
        parms.success(a);
      }, 800);
    }
    //下拉刷新
    jroll.pulldown({
      refresh: function(complete) {
        jroll.options.page = 1;
        jroll.scrollTo(0, 44, 0, true);  //滚回顶部
        //axios.get(url).then((response) => {
        //  complete();
        //  vm.indexdata = response.data[0]
        //  vm.$store.state.storeIndex.indexData = response.data[0]
        //  console.log(vm.$store.state.storeIndex.indexData)
        //})
        ajax({
          url: "getData.do?page=" + 1,
          success: function(data) {
            complete();
            jroll.scroller.innerHTML = "";    //清空内容
            jroll.infinite_callback(data);
          }
        });
      }
    });
    //无限加载
    jroll.infinite({
      getData: function(page, callback) { //获取数据的函数，必须传递一个数组给callback
        ajax({
          url: "getData.do?page=" + page,
          success: function(data) {
            callback(data);
          }
        });
      },
      template: `<div class="content-item">
                   <div class="content-first-line">
                     <span class="content-title">{{=_obj.title}}</span>
                   </div>
                   <div class="content-second-line">
                     <span class="content-summary">{{=_obj.summary}}</span>
                   </div>
                   <div class="content-third-line">
                     <span class="content-time">{{=_obj.time}}</span>
                     <span class="content-writer">{{=_obj.writer}}</span>
                     <span class="content-type">{{=_obj.type}}</span>
                     <span class="content-readers">{{=_obj.readers}}</span>
                   </div>
                 </div>` //每条数据模板
    });
  },
}
</script>

<style scoped>
#container-study{
  width: 100%;
  position: absolute;
  top: 44px;
  bottom: 0;
}
.infinite-list{
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;
}
.infinite-list-item{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: #e8f3fe;
  margin: 10px;
  color: #7dbcfc;
}
</style>
