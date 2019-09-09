<template>
  <div id="manage-articles">
    <el-button-group>
      <el-button class="" type="primary" size="small" icon="el-icon-circle-plus-outline" @click="createArticle">新建</el-button>
      <el-button class="" type="primary" size="small" icon="el-icon-delete" @click="">删除</el-button>
      <el-button class="" type="primary" size="small" icon="el-icon-refresh-right" @click="">刷新</el-button>
      <el-button class="" type="primary" size="small" :icon="checkIcon" @click="checkAll">全选</el-button>
    </el-button-group>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">
        <div class="article" :style="{'width': maxWidth-190+'px'}">{{city}}</div>
      </el-checkbox>
    </el-checkbox-group>
    <myPopup v-if="popupIsShow" @hidePopup="hidePopup"></myPopup>
  </div>
</template>

<script>
import myPopup from '@/components/manage/PopupArticle'
import axios from 'axios'
import { mapState, mapMutations} from 'vueX'

export default {
  name: 'Nav',
  props: ['navdata'],
  components: {
    myPopup: myPopup,
  },
  computed: {
    ...mapState({
      articles: (state) => state.manageData.articles
    })
  },
  data () {
    return {
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
      isCheckAll: false,
      checkIcon: 'el-icon-remove-outline',//'el-icon-circle-check'
      popupIsShow: false,
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
    }
  },
  methods: {
    checkAll() {
      this.isCheckAll = !this.isCheckAll
      this.checkedCities = this.isCheckAll ? this.cities : []
      this.checkIcon = this.isCheckAll ? 'el-icon-circle-check' : 'el-icon-remove-outline'
    },
    handleCheckedCitiesChange(value) {
      this.isCheckAll = value.length === this.cities.length;
      this.checkIcon = this.isCheckAll ? 'el-icon-circle-check' : 'el-icon-remove-outline'
    },
    createArticle () {
      console.log(123)
      this.popupIsShow = true
    },
    hidePopup () {
      this.popupIsShow = false
    },
  },
  created () {
    //axios.get('/api/manage/articles').then((response) => {
    //  this.initIndex(response.data[0])
    //})
  }
}
</script>

<style lang="less">
#manage-articles{
  .article{
    height: 50px;
    background: lightyellow;
  }
  .el-checkbox{
    display: bloack;
    .el-checkbox__label{
      line-height: 50px;
    }
  }
}
</style>
