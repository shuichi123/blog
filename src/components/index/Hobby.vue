<template>
  <div id="container-study">
    3 爱好
    <transition mode="out-in">
      <myBody v-bind:currentdata="currentdata"></myBody>
    </transition>
  </div>
</template>

<script>
import mySecNav from '@/components/SecNav'
import myBody from '@/components/Body'
import axios from 'axios'

var i = '    <mySecNav v-bind:secnavdata="secnavdata" @changeview="changeSectype"></mySecNav>'
export default {
  name: 'Study',
  data () {
    return {
      currentdata: [],
      secnavdata: {},
      studydata: {}
    }
  },
  components: {
    mySecNav: mySecNav,
    myBody: myBody
  },
  created () {
    axios.get('/api/study').then((response) => {
      this.studydata = response.data[0].studydata
      this.currentdata = this.studydata.all
      this.secnavdata = this.studydata.secnavdata
    })
  },
  methods: {
    changeSectype: function (sectypename) {
      this.currentdata = this.studydata[sectypename]
    }
  }
}
</script>

<style scoped>
#container-study{
  width: 100%;
  position: relative;
  margin: 70px 0 0 0;
}
</style>
