<template>
  <div ref="pagesWrapper" class='pagesWrapper' @touchstart="scrollerTouchStart" @touchmove="scrollerTouchMove" @touchend="scrollerTouchEnd">
    <ul ref="pagesScroller">
      <li class="page" ref="pagesLi" v-for="item in pages" :style="{'width': maxWidth+'px', 'height': maxHeight+'px'}" v-bind:key="item.id">
        <component class="page-comp" v-bind:is="item.component"></component>
      </li>
    </ul>
  </div>
</template>

<script>
// import myContentLi from '@/components/ContentLi'
// import JRoll from 'JRoll'
export default {
  mounted () {
    console.log()
    this.scroller = this.$refs.pagesScroller
    console.log(this.$refs.pagesScroller)
    this.maxIndex = this.pages.length - 1
    for (let i=0; i<=this.maxIndex; i++) {
      this.$refs.pagesLi[i].style.transform = 'translate3d('+ i*this.maxWidth +'px, 0, 0)'
    }
  },
  data () {
    return {
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
      pageIndex: 0,
      pagesLength: 2,
      scroller: {},
      currentX: 0,
      touchStartTime: 0,
      touchEndTime: 0,
      direction: 0, // 1(左右), 2(上下)
      maskData: {topMaskDefault: {top: 50}},
      endXX: [0, 0],
      endXXtag: 0
    }
  },
  components: {
  },
  props: ['pages'],
  methods: {
    scrollerTouchStart: function (ev) {
      this.direction = 0 // 清除方向的设置
      let touch = ev.changedTouches[0]
      this.touchX1 = touch.pageX
      this.touchY1 = touch.pageY
      this.touchStartTime = Date.now()
    },
    scrollerTouchMove: function (ev) {
      const touch = ev.changedTouches[0]
      this.touchX2 = touch.pageX
      this.touchY2 = touch.pageY
      this.distX = this.touchX2 - this.touchX1
      this.distY = this.touchY2 - this.touchY1
      //this.endXX[0] = this.endXX[1]
      //this.endXX[1] = this.touchX2 - this.touchX1 + this.currentX
      this.endX = this.touchX2 - this.touchX1 + this.currentX
      if (this.direction) { // 已设置滑动的方向
        switch (this.direction) {
          case 1 : // 左右
            if (this.pageIndex===this.maxIndex && this.distX<0) { // 在pages的最右侧，向左滑
              const width = -this.maxIndex*this.maxWidth
              this.util.utils.moveTo(this.scroller, width, 0, 0)
            } else if (this.pageIndex===0 && this.distX>0) { // 在pages的最左侧，向右滑
              this.util.utils.moveTo(this.scroller, 0, 0, 0)
            } else {
              ev.preventDefault() // 阻止浏览器滑动前进后退事件
              ev.stopPropagation() // 阻止冒泡
              this.util.utils.moveTo(this.scroller, this.endX, 0, 0)
            }
            break
          case 2 : // 上下
            break
          default :
            break
        }
      }
      //第一次move不移动，只设置方向（为了父节点的方向的初始化ev.preventDefault）
      if (this.direction === 0) { // 未设置滑动的方向
        if (Math.abs(this.distX)>3*Math.abs(this.distY)) { // 左右
          this.direction = 1
        } else if (Math.abs(this.distX)<Math.abs(this.distY)) { // 上下
          this.direction = 2
        }
      }
    },
    scrollerTouchEnd: function (ev) {
      switch (this.direction) {
        case 1 : // 左右
          if (this.pageIndex===this.maxIndex && this.distX<0) { // 在pages的最右侧，向左滑
            
          } else if (this.pageIndex===0 && this.distX>0) { // 在pages的最左侧，向右滑
            
          } else {
            //ev.preventDefault() // 阻止浏览器滑动前进后退事件
            //ev.stopPropagation() // 阻止冒泡
            if (Math.abs(this.distX)>this.maxWidth/10){
              let sign = Math.sign(this.distX)
              this.pageIndex = this.pageIndex - sign
              this.currentX = -this.pageIndex*this.maxWidth
              this.util.utils.moveTo(this.scroller, this.currentX, 0, 200)
              //this.scroller.style.transform = 'translate('+ this.currentX +'px, 0px) translateZ(0px) scale(1)'
            }else {
              this.util.utils.moveTo(this.scroller, this.currentX, 0, 100)
            }
          }
          //console.log('this.pageIndex is: ' + this.pageIndex)
          break
        case 2 : // 上下
          break
        default :
          break
      }
    }
  },
  whatch: {
    pages(newValue, oldValue){
    }
  }
}
</script>

<style scoped lang="less">
.pagesWrapper{
  transform: translate(0px, 0px) translateZ(0px) scale(1);
  .page{
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
  }
}
</style>
