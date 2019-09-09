<template>
  <div id="nav">
    <transition name="">
      <div class="nav-type-list">
        <ul>
          <li v-for="item in navList" v-bind:key="item.id">
            <router-link :to="{ path: item.path }">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
    </transition>
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
#nav{
  background: white;
  z-index: 90;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
}
#nav .nav-type-list{
  margin: 0 0 0 50px;
}
#nav .nav-type-list li{
  display: inline-block;
  margin: 0 5px;
}
</style>
