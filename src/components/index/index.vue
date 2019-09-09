<template>
  <div id="index" @touchstart="appTouchStart" @touchmove="appTouchMove" @touchend="appTouchEnd" :style="{}">

    <myAside v-bind:sideData="indexData.nav" @changeOpacity="changeOpacity"></myAside><!-- z-index=100 -->
    <myAbout v-bind:aboutData="aboutData"></myAbout><!-- z-index=100 -->
    <myPages v-bind:pages="pages" v-bind:scrollId="scrollId"></myPages><!-- z-index=70 -->
  </div>
</template>

<script>
import myTest from '@/components/Test'
import myNav from '@/components/index/Nav'
import myAside from '@/components/index/Aside'
import myAbout from '@/components/index/About'
// import myPages from '@/components/Pages'
import myPages from '@/components/basis/Scroll'
import myRecommend from '@/components/index/Recommend'
import myStudy from '@/components/index/Study'
import myHobby from '@/components/index/Hobby'
import myTools from '@/components/index/Tools'
import myLargePage from '@/components/largePage/LargePage'
import axios from 'axios'
import { mapState, mapMutations} from 'vueX'

export default {
  name: 'App',
  computed: {
    ...mapState(['indexData'])
  },
  methods: {
    appTouchStart: function (ev) {
      //ev.preventDefault() // 阻止浏览器滑动前进后退事件
    },
    appTouchMove: function (ev) {
      ev.preventDefault() // 阻止浏览器滑动前进后退事件
    },
    appTouchEnd: function (ev) {
      //ev.preventDefault() // 阻止浏览器滑动前进后退事件
    },
    ...mapMutations(['initIndex']),
  },
  components: {
    myNav: myNav,
    myAside: myAside,
    myAbout: myAbout,
    myPages: myPages,
    myRecommend: myRecommend,
    myTest: myTest,
  },
  data () {
    return {
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
      pages2: [{id: 0, name: 'home', component: myRecommend}, {id: 1, name: 'study', component: myStudy}, {id: 2, name: 'test', component: myLargePage}, {id: 3, name: 'tools', component: myLargePage},
      {id: 4, name: 'home1', component: myRecommend}, {id: 5, name: 'study', component: myStudy}, {id: 6, name: 'hobby', component: myLargePage}, {id: 7, name: 'tools', component: myLargePage},
      {id: 8, name: 'home1', component: myRecommend}, {id: 9, name: 'study', component: myStudy}, {id: 10, name: 'hobby', component: myLargePage}, {id: 11, name: 'tools', component: myLargePage}
      ],
      pages: [{id: 0, name: 'home', component: myRecommend}, {id: 1, name: 'study', component: myStudy}, {id: 2, name: 'test', component: myTest}, {id: 3, name: 'tools', component: myLargePage},
      ],
      aboutData: {title: '标题', body: ['1', '2', '3', '4', '5', '6', '7', '8']}
    }
  },
  mounted () {
    axios.get('/api/index').then((response) => {
      this.initIndex(response.data)
      console.log(response.data)
    })
  }
}
</script>

<style>

</style>
