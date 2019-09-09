<template>
  <div id="manage-nav">
    <el-menu default-active="1-1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu v-for="(item, index) in navdata" :index="item.index">
        <template slot="title"><i class="el-icon-location"></i><span>{{ item.title }}</span></template>
        <el-submenu v-for="item2 in item.menus" :index="item2.index" title="item2.title">
          <template slot="title">{{ item2.title }}</template>
          <el-menu-item v-for="item3 in item2.menus" :index="item3.index" @click="addTab(item3.menu, item3.index)">{{ item3.menu }}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import $ from 'jquery'
import myEdit from '@/components/manage/Edit'
import myManArticles from '@/components/manage/ManArticles'
import myManRelease from '@/components/manage/ManRelease'
import myManTags from '@/components/manage/ManTags'
import myManTopic from '@/components/manage/ManTopic'
import myManTypes from '@/components/manage/ManTypes'
import myManSets from '@/components/manage/ManSets'
import mySetType from '@/components/manage/SetType'
import mySetSecType from '@/components/manage/SetSecType'
import mySetTag from '@/components/manage/SetTag'
import mySetMusic from '@/components/manage/SetMusic'
import mySetTopic from '@/components/manage/SetTopic'
import mySetWriter from '@/components/manage/SetWriter'
import { mapState, mapMutations } from 'vueX'

export default {
  name: 'Nav',
  props: ['navdata'],
  components: {
    myEdit: myEdit,
    myManArticles: myManArticles
  },
  mounted () {
  },
  computed: {
    ...mapState({
      editableTabsValue: (state) => state.manageData.tabdata.editableTabsValue,
      editableTabs: (state) => state.manageData.tabdata.editableTabs,
      tabIndex: (state) => state.manageData.tabdata.tabIndex,
      navdata: (state) => state.manageData.navdata,
    }),
    //...mapState(['manageDate']),
  },
  data () {
    return {
      isCollapse: false,
    }
  },
  methods: {
    handleOpen(key) {
      console.log(key);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getComponent(index) {
      let map = {
        index1_1_1: myManArticles,
        index1_1_2: myManRelease,
        index1_1_3: myManTypes,
        index1_1_4: myManTopic,
        index1_1_5: myManTags,
        index1_2_1: mySetType,
        index1_2_2: mySetTopic,
        index1_2_3: mySetTag,
        index1_2_4: mySetMusic,
        index1_2_5: mySetWriter,
      }
      return map[index]
    },
    addTab(menu, index) {
      let newIndex = 'index' + index.replace(/-/g, "_")
      let component = this.getComponent(newIndex)
      this.addManageTabs({
        title: menu,
        index: index,
        component: component
      })
    },
    ...mapMutations(['addManageTabs']),
  },
}
</script>

<style scoped lang='less'>
#manage-nav{
  background: white;
  z-index: 80;
  position: fixed;
  left: 0;
  top: 0;
  width: 190px;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 50px 0 0 0;
  border-right: solid 1px #e6e6e6;
  .el-menu{
    height:100%;
    width: 110%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
