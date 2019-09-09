<template>
  <div id="welcome">
    <myCount :num='num'></myCount>
    点击进入
  </div>
</template>

<script>
import axios from 'axios'
import Count from '@/components/welcome/Count'

export default {
  name: 'Welcome',
  computed: {
  },
  methods: {
  },
  components: {
    myCount: Count,
  },
  data () {
    return {
      num: 7,
    }
  },
  mounted () {
    
  }
}
</script>

<style scoped lang="less">
@media screen and (max-width: 720px){
  #welcome{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #111111;
  }
}
@media screen and (min-width: 720px){
  #welcome{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #111111;
  }
}

</style>
