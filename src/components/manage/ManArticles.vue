<template>
  <div id="manage-articles" :style="{'height': maxHeight-90 +'px'}">
    <el-button-group>
      <el-button class="" type="primary" size="small" icon="el-icon-circle-plus-outline" @click="createArticle">新建</el-button>
      <el-button class="" type="primary" size="small" icon="el-icon-delete" @click="">删除</el-button>
      <el-button class="" type="primary" size="small" icon="el-icon-refresh-right" @click="">刷新</el-button>
      <el-button class="" type="primary" size="small" icon="checkIcon" @click="checkAll">全选</el-button>
    </el-button-group>
    <div class="article-group" :style="{'height': maxHeight-120 +'px'}">
      <el-checkbox-group v-model="checkedArticles" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="article in articles" :label="article.fields.article_modifyTime" :key="article.fields.article_modifyTime">
          <div class="article-line1">
            <span class="article-title">{{article.fields.article_title}}</span>
            <span class="article-time">{{article.fields.article_modifyTime}}</span>
            <span class="icon-row">
              <el-button size="small" type="primary" @click="preview(article.pk)" icon="el-icon-money" circle></el-button>
              <el-button size="small" type="primary" @click="edit(article.pk, article.fields.article_content)" icon="el-icon-edit" circle></el-button>
              <el-button size="small" type="primary" @click="del(article.pk)" icon="el-icon-delete" circle></el-button>
            </span>
          </div>
        </el-checkbox>
      </el-checkbox-group></div>
    <myPopup :article_num="article_num" v-if="popupIsShow" @hidePopup="hidePopup" @showEdit="showEdit"></myPopup>
    <myEdit @close="closeEdit" :editormdId="name" :article_content="article_content" :article_num="article_num" v-if="editIsShow"></myEdit>
  </div>
</template>

<script>
import myPopup from '@/components/manage/PopupArticle'
import axios from 'axios'
import { mapState, mapMutations} from 'vueX'
import myEdit from '@/components/manage/Edit'

export default {
  name: 'Nav',
  props: ['name'],
  components: {
    myPopup: myPopup,
    myEdit: myEdit,
  },
  computed: {
    article () {
      
    },
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
      checkedArticles: [],
      editIsShow: false,
    }
  },
  methods: {
    preview (article_num) {},
    edit (article_num, article_content) {
      this.article_num = article_num
      this.article_content = article_content
      this.popupIsShow = true
    },
    del (article_num) {},
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
      this.article_num = ""
      this.popupIsShow = true
    },
    hidePopup () {
      this.popupIsShow = false
    },
    showEdit () {
      this.editIsShow = true
    },
    closeEdit () {
      this.editIsShow = false
    },
    ...mapMutations(['initManageArticles']),
  },
  created () {
    this.initManageArticles()
  }
}
</script>

<style lang="less">
#manage-articles{
  overflow: hidden;
  .article-group{
    overflow-y: auto;
    overflow-x: hidden;
    .el-checkbox{
      border-bottom: 1px solid #DCDFE6;
      width: 100%;
      display: bloack;
      .el-checkbox__input{
        .el-checkbox__inner{
          z-index: 0;
        }
      }
      .el-checkbox__label{
        width: 100%;
        .article-line1{
          position: relative;
          line-height: 50px;
          font-size: 18px;
          .article-time{
            color: #909399;
            font-size: 12px;
          }
          .icon-row{
            position: absolute;
            right: 0;
            padding-right: 40px;
          }
        }
      }
    }
  }
}
</style>
