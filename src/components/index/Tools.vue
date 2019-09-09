<template>
  <div id="container-tools">
    <div id="secNav-tools">
      <span class="">工具</span>
      <span class="">小说</span>
      <span class="">画板</span>
    </div>
    <component v-bind:is='currentTool'></component>
  </div>
</template>

<script>
import myToolNovel from '@/components/ToolNovel'
export default {
  name: 'ToolNovel',
  data () {
    return {
      msg: '明天你好～',
      url: '../assets/logo.png',
      currentTool: myToolNovel
    }
  },
  components: {
    myToolNovel: myToolNovel
  }
}
</script>

<style scoped>
#container-tools{
  position: relative;
  margin: 50px 0 0 0;
  width: 150%;
  height: 500px;
  background: yellow;
}
</style>
