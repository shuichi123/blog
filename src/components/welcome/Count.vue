<template>
  <div id="count" class="count">
    <canvas id="count-canvas"></canvas>
    <div id="count-container">
      <!-- <ul data-time="1000">
        <li data-saturation="0" data-lightness="100">3</li>
      </ul>
      <ul data-time="1000">
        <li data-saturation="0" data-lightness="100">2</li>
      </ul>
      <ul data-time="1000">
        <li data-saturation="0" data-lightness="100">1</li>
      </ul> -->
      <ul data-time="1000">
        <li data-saturation="0" data-lightness="100">1</li>
      </ul>
      <ul data-time="3000">
        <li data-hue="197">w</li>
        <li data-hue="0">e</li>
        <li data-hue="197">l</li>
        <li data-hue="197">c</li>
        <li data-hue="45">o</li>
        <li data-hue="197">m</li>
        <li data-hue="197">e</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Count',
  props: ['num'],
  data () {
    return {
      
    }
  },
  mounted () {
    $script(['static/js/count.js', ], () => {
      console.log('count.js已加载')
    })
    console.log(111)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@media screen and (max-width: 720px){
  #count{
    width: 100%;
    height: 80%;
    #count-canvas{
      width: 100%;
      height: 100%;
    }
    #count-container{
      display: none;
    }
  }
}
@media screen and (min-width: 720px){
  #count{
    width: 100%;
    height: 80%;
    #count-canvas{
      width: 100%;
      height: 100%;
    }
    #count-container{
      display: none;
    }
  }
}
</style>
