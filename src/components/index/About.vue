<template>
  <div id="about" :style="{'width': maxWidth+'px', 'height': maxHeight+'px'}">
    <button class="about-control" href="javascript:;" @click="aboutControl">关于</button>
    <div ref="aboutPage" class="about-page" @touchstart="aboutTouchStart" @touchmove="aboutTouchMove" @touchend="aboutTouchEnd">
      <h3 class="about-title">{{ title }}</h3>
      <div ref="aboutBody" class="about-body">
        <ul>
          <li v-for="item in body" v-bind:key="item">
            <p>{{ item }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'about',
  props: ['aboutData'],
  mounted () {
    this.title = this.aboutData.title
    this.body = this.aboutData.body
  },
  data () {
    return {
      title: '',
      body: [],
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
      touchStartTime: 0,
      touchEndTime: 0,
      currentX: 0,
      currentY: 0,
      isDirection: false, //是否已设置了滑动的方向
      direction: 0 // 1(左右), 2(上下)
    }
  },
  methods: {
    aboutTouchStart: function (ev) {
      this.isDirection = false // 清除方向的设置
      const touch = ev.changedTouches[0]
      this.touchX1 = touch.pageX
      this.touchY1 = touch.pageY
      this.touchStartTime = Date.now()
    },
    aboutTouchMove: function (ev) {
      ev.preventDefault() // 阻止浏览器滑动前进后退事件
      const touch = ev.changedTouches[0]
      this.touchX2 = touch.pageX
      this.touchY2 = touch.pageY
      this.distX = this.touchX2 - this.touchX1
      this.distY = this.touchY2 - this.touchY1
      this.endX = this.touchX2 - this.touchX1 + this.currentX
      this.endY = this.touchY2 - this.touchY1 + this.currentY
      if (!this.isDirection) { // 未设置滑动的方向
        if (Math.abs(this.distX)<4 && Math.abs(this.distY)<4) { // 距离太短直接返回
          return false
        } else if (Math.abs(this.distX)>Math.abs(this.distY)) { // 左右
          this.isDirection = true
          this.direction = 1
        } else if (Math.abs(this.distX)<Math.abs(this.distY)) { // 上下
          this.isDirection = true
          this.direction = 2
        }
      } else { // 已设置滑动的方向
        switch (this.direction) {
          case 1 : // 左右
            if (this.distX>0) { // 向右滑
              this.util.translate(this.$refs['aboutPage'], this.endX, 0)
              console.log('moving')
            } else if (this.distX<0) { // 向左滑
              // do nothing
            }
            break
          case 2 : // 上下
            const height = this.maxHeight - this.$refs.aboutBody.clientHeight
            if (height>0) break
            if (this.endY<height) { // 到底部
              const dist = (this.endY-height)/4 + height
              this.util.translate(this.$refs.aboutBody, 0, dist)
            } else if (this.endY>0) { // 到顶部
              this.util.translate(this.$refs.aboutBody, 0, this.endY/4)
            } else if (this.endY<0 && this.endY>height) {
              this.util.translate(this.$refs.aboutBody, 0, this.endY)
            }
            break
          default :
            break
        }
      }
    },
    aboutTouchEnd: function (ev) {
      //ev.preventDefault() // 阻止浏览器滑动前进后退事件
      const touch = ev.changedTouches[0]
      this.touchX2 = touch.pageX
      this.touchY2 = touch.pageY
      this.distX = this.touchX2 - this.touchX1
      this.distY = this.touchY2 - this.touchY1
      const sign = Math.sign(this.distX)
      this.endX = this.touchX2 - this.touchX1 + this.currentX
      this.endY = this.touchY2 - this.touchY1 + this.currentY
      this.touchEndTime = Date.now()
      const touchTime = this.touchEndTime - this.touchStartTime
      // 当滑动距离超过一半或者快速滑动一段距离时，就进行完整的滑动
      // 快速滑动的数据是自己尝试的，体验可能不是很好^ ^
      switch (this.direction) {
        case 1 : // 左右
          if (Math.abs(this.distX) > this.maxWidth / 2 || (touchTime < 150 && Math.abs(this.distX) > this.maxWidth / 10)) {
            if (this.distX > 0) { //
              this.currentX = 0
            } else if (this.distX < 0) {
              this.currentX = -this.maxWidth
            } else {
              // this.currentX = this.currentX
            }
          } else {
            // do nothing
          }
          this.util.translate(this.$refs['aboutPage'], this.currentX, 0, {transitionDuration: '.5s'})
          break
        case 2 : // 上下
          const dist = this.maxHeight - this.$refs.aboutBody.clientHeight
          if (dist > 0) break
          if (this.endY > 0) {
            this.currentY = 0
          } else if (this.endY < dist) {
            this.currentY = dist
          } else {
            this.currentY = this.endY
          }
          this.util.translate(this.$refs.aboutBody, 0, this.currentY, {transitionDuration: '.5s'})
          break
        default :
          return false
      }
    },
    aboutControl: function () {
      this.currentX = -this.maxWidth
      this.$emit('changeOpacity', {opacity: this.currentX/this.maxWidth*0.4, transition: 'all .5s ease'})
      this.util.translate(this.$refs.aboutPage, this.currentX, 0, {transitionDuration: '.5s'})

    }
  },
  watch: {
    aboutData (newvalue, oldvalue) {
      this.title = newvalue.title
      this.body = newvalue.body
    }
  }
}
</script>

<style scoped>
#about{
  z-index: 100;
  position: fixed;
  left: 101%;
  top: 0;
}
#about .about-control{
  position: absolute;
  left: -30px;
  top: 0;
}
#about .about-page{
  width: 100%;
  height: 100%;
  background: green;
}
#about .about-title{
  text-align: center;
}
#about .about-body{
  height: 1000px;
  background: yellow;
}
</style>

