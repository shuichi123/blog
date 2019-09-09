<template>
  <div ref='recommendScroll' id="container-shouye">
    <ul class="home-articles">
      <li v-for="item in homedata.last" v-bind:key="item.id">
        <myContentLi :article="item"></myContentLi>
      </li>
    </ul>
    <div id="secNav-shouye">
      <span class="secNav-shouye-home" @click="changeview('all')">全部</span>
      <span class="secNav-shouye-last" @click="changeview('last')">最近更新</span>
      <span class="secNav-shouye-most" @click="changeview('most')">查看最多</span>
    </div>
  </div>
</template>

<script>
import myBody from '@/components/Body'
import myContentLi from '@/components/ContentLi'
import { mapState} from 'vueX'

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      homedata: (state) => state.indexData.homedata,
    })
    //...mapState(['indexData'])
  },
  components: {
    myContentLi: myContentLi
  },
  methods: {
    changeview: function (mode) {
      this.currentdata = this.homedata[mode]
    },
  },
  updated () {
    let recommendScroll = this.$refs.recommendScroll
    let jroll = new JRoll(recommendScroll, {
      scrollBarY: true
    });
  }
}
</script>

<style scoped lang="less">
#container-shouye{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 50px 0 0 0;
  #secNav-shouye{
    position: fixed;
    top: 50px;
    left: -10px;
    width: 100%;
    background: white;
    text-align: center;
  }
  .home-articles{
    
  }
}
</style>
