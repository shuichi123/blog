<template>
  <div id="side" :style="{'width': sideWidth+'px', 'height': maxHeight+'px'}" @touchstart="sideTouchStart" @touchmove="sideTouchMove" @touchend="sideTouchEnd">
    <div class="side-mask" ref="sideMask" v-if="show" :style="{'width': maxWidth+'px', 'height': maxHeight+'px'}"></div>
    <button @click="sideControl">{{ msg }}</button>
    <div ref='sidePage' class="side-list" :style="{'width': maxWidth*0.8+'px', 'height': maxHeight+'px'}">
      <ul>
        <li v-for="item in sideList" v-bind:key="item.id">
          <router-link :to="{ path: item.path }">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'side',
  props: ['sideData'],
  data () {
    return {
      msg: '>>',
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
      sideWidth: window.innerWidth*0.05,
      sideList: [],
      currentX: 0,
      opacity: 0,
      show: false,
      st: {} //定时器
    }
  },
  methods: {
    sideTouchStart: function (ev) {
      this.show = true
      clearInterval(this.st)
      const touch = ev.changedTouches[0]
      this.touchX1 = touch.pageX
      this.touchStartTime = Date.now()
    },
    sideTouchMove: function (ev) {
      ev.preventDefault() // 阻止浏览器滑动前进后退事件
      const touch = ev.changedTouches[0]
      this.touchX2 = touch.pageX
      this.distance = this.touchX2 - this.touchX1
      this.endX = this.currentX - this.touchX1 + this.touchX2
      if (1.25*this.endX < this.maxWidth) {
        this.util.translate(this.$refs.sidePage, this.endX, 0)
        this.opacity = this.endX/this.maxWidth*0.4
        this.util.setOpacity(this.$refs.sideMask, this.opacity, {transitionDuration: '0s'})
      }
      //if (this.currentX === 0 && this.distance>0 && 1.25*this.endX < this.maxWidth) {
      //  // 原先隐藏且向右滑动显示
      //  this.util.translate(this.$refs.sidePage, this.endX, 0)
      //  this.opacity = this.endX/this.maxWidth*0.4
      //  this.$emit('changeOpacity', {opacity: this.opacity, transition: ''})
      //} else if (this.currentX>0 && this.distance<0){
      //  // 原先显示且向左滑动隐藏
      //  this.util.translate(this.$refs.sidePage, this.endX, 0)
      //  this.opacity = this.endX/this.maxWidth*0.4
      //}
    },
    sideTouchEnd: function (ev) {
      //ev.preventDefault() // 阻止浏览器滑动前进后退事件(禁用了end就触发不了click)
      const touch = ev.changedTouches[0]
      this.touchX2 = touch.pageX
      this.distance = this.touchX2 - this.touchX1
      this.endX = this.currentX - this.touchX1 + this.touchX2
      this.touchEndTime = Date.now()
      const touchTime = this.touchEndTime - this.touchStartTime
      // 当滑动距离超过一半或者快速滑动一段距离时，就进行完整的滑动
      // 快速滑动的数据是自己尝试的，体验可能不是很好^ ^
      if (Math.abs(this.distance) > this.maxWidth / 3 || (touchTime < 150 && Math.abs(this.distance) > this.maxWidth / 10)) {
        if (this.currentX === 0 && this.distance>0) { // 向右滑
          this.currentX = this.maxWidth*0.8-this.currentX
          this.sideWidth = this.maxWidth
        } else if (this.currentX>0 && this.distance<0) { // 向左滑
          this.currentX = this.maxWidth*0.8-this.currentX
          this.sideWidth = window.innerWidth*0.05
        }
      }
      console.log('touchend')
      this.util.translate(this.$refs.sidePage, this.currentX, 0, {transitionDuration: '.5s'})
      this.util.setOpacity(this.$refs.sideMask, this.currentX/this.maxWidth*0.4, {transitionDuration: '.5s'})
      let vm = this;
      if (this.currentX === 0){
        vm.st = setTimeout(function () {
          vm.show = false
          vm.opacity = 0
        }, 600)
      }
    },
    sideControl: function () {
      clearInterval(this.st)
      this.show = true
      this.currentX = this.maxWidth*0.8-this.currentX
      this.util.translate(this.$refs.sidePage, this.currentX, 0, {transitionDuration: '.5s'})
      this.util.setOpacity(this.$refs.sideMask, this.currentX/this.maxWidth*0.4, {transitionDuration: '.5s'})
      this.sideWidth = window.innerWidth
    }
  },
  watch: {
    sideData (newvalue, oldvalue) {
      this.sideList = newvalue
    }
  }
}
</script>

<style scoped lang="less">
#side{
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
}
#side .side-mask{
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  background: black;
  &.side-show{
    display: block;
  }
  &.side-hide{
    display: none;
    transition: all 0.5s ease;
  }
}
#side>button{
  position: absolute;
  left: 0;
  top: 0;
}
#side .side-list{
  position: fixed;
  left: -80%;
  top: 0;
  background: white;
}
.animated{
  transition:all 0.5s ease;
  animation-duration: 0.5s;
}
</style>
