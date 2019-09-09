<template>
  <div id="manage-content">
    <el-tabs v-model="editableTabsValue" type="border-card" closable @tab-remove="removeTab" @tab-click='clickTab'>
      <el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
        <component v-bind:is="item.component" :name="item.name"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import myEdit from '@/components/manage/Edit'
import { mapState, mapMutations } from 'vueX'
import myBody from '@/components/Body'

export default {
  components: {
    myEdit: myEdit,
    myBody: myBody,
  },
  computed: {
    ...mapState({
      editableTabsValue: (state) => state.manageData.tabdata.editableTabsValue,
      editableTabs: (state) => state.manageData.tabdata.editableTabs,
      tabIndex: (state) => state.manageData.tabdata.tabIndex,
    }),
    //...mapState(['manageData']),
  },
  updated () {
  },
  created() {
  },
  data() {
    return {
    }
  },
  methods: {
    removeTab(targetName) {
      this.removeManageTabs(targetName)
    },
    clickTab(target) {
      console.log(target.$el.id.split('-')[1])
      let activeName = target.$el.id.split('-')[1]
      this.setActiveManageTabs(activeName)
    },
    ...mapMutations(['removeManageTabs', 'setActiveManageTabs']),
  }
}
</script>

<style lang="less">
#manage-content{
  background: white;
  z-index: 100;
  position: fixed;
  left: 190px;
  top: 50px;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  .el-tabs{
    height: 100%;
  }
  .el-tabs__nav{
    z-index: 0;
  }
  .el-tabs__content{
    padding: 0;
    overflow: visible;
  }
}
</style>
