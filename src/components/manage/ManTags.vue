<template>
  <div id="manage-header">
    ManTags
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Nav',
  props: ['navdata'],
  data () {
    return {
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
      navList: [],
      currentX: 0,
    }
  },
  methods: {
  },
  watch: {
    navdata (newvalue, oldvalue) {
      this.navList = newvalue
    }
  }
}
</script>

<style scoped>
#manage-header{
  background: white;
  z-index: 90;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
}
</style>
