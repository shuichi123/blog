<template>
  <div class="popup-article">
    <el-form class="popup-form" :model="article" :rules="rules" ref="article" label-width="100px">
      <el-form-item label="文章标题" prop="article_title">
        <el-input v-model="article.article_title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="type">
        <el-col :span="11">
          <el-select v-model="article.type" placeholder="请选择一级分类" @change="changeType">
            <el-option v-for="type in types" :label="type.fields.type_name" :value="type.pk"></el-option>
          </el-select>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-select v-model="article.secType" placeholder="请选择二级分类">
            <el-option v-for="secType in compSecTypes" :label="secType.fields.secType_name" :value="secType.pk"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="文章简介" prop="article_abstract">
        <el-input type="textarea" v-model="article.article_abstract"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('article')">保存</el-button>
        <el-button type="primary" @click="edit(article_num)">编辑</el-button>
        <el-button type="primary" @click="close">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//<el-form-item label="文章标签" prop="tags">
//  <el-checkbox-group v-model="article.tags">
//    <el-checkbox label="美食/餐厅线上活动" name="tags"></el-checkbox>
//    <el-checkbox label="地推活动" name="tags"></el-checkbox>
//    <el-checkbox label="线下主题活动" name="tags"></el-checkbox>
//    <el-checkbox label="单纯品牌曝光" name="tags"></el-checkbox>
//  </el-checkbox-group>
//</el-form-item>
//<el-button type="primary" @click="resetForm('article')">重置</el-button>
import myEdit from '@/components/manage/edit'
import { mapState, mapMutations } from 'vueX'

export default {
  components: {
  },
  props: ['article_num'],
  computed: {
    num () {
      return this.article_num ? '?article_num='+this.article_num : ''
    },
    ...mapState({
      csrfToken: (state) => state.csrfToken,
      types: (state) => state.manageData.types,
      secTypes: (state) => state.manageData.secTypes,
    }),
  },
  data() {
    return {
      compTypes: [],
      compSecTypes: [],
      article: {
        article_title: '',
        article_abstract: '',
        type: '',
        secType: '',
        tags: [],
      },
      rules: {
        article_title: [
          { required: true, message: '请输入文章名称', trigger: 'blur' },
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择一级分类', trigger: 'change' }
        ],
        secType: [
          { required: true, message: '请选择二级分类', trigger: 'change' }
        ],
        tags: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        article_abstract: [
          { required: true, message: '请填写文章简介', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    hidePopup () {
      this.$emit('hidePopup')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //submit
          let data = {
            article_title: this.article.article_title,
            article_abstract: this.article.article_abstract,
            article_writer: "吹口琴的喵喵~",
            type_id: this.article.type,
            secType_id: this.article.secType,
            csrfToken: this.csrfToken,
          }
          //let param = new URLSearchParams()
          let param = new FormData()
          for (let key in data) {
            param.append(key, data[key])
          }
          axios.post('/api/manage/article'+this.num, param).then((res) => {
            console.log('res=>', res)
          })
        } else {
          alert('error submit!!');
          return false;
        }
      })
      this.initManageArticles()
    },
    edit (article_num) {
      this.hidePopup()
      this.$emit('showEdit', article_num)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    close () {
      this.hidePopup()
    },
    changeType (value) {
      console.log(value)
      this.compSecTypes = this.secTypes.filter( (secType) => parseInt(secType.fields.type) === value )
    },
    changeSecType (value) {
      console.log(value)
      this.compTypes = this.types.filter( (type) => type.pk === this.secTypes[value-1].fields.type )
    },
    ...mapMutations(['initManageArticles']),
  },
  mounted () {
    if (this.num) {
      axios.get('/api/manage/article'+this.num).then((res) => {
        this.article = res.data.article[0].fields
        this.changeType(this.article.type)
      })
    }
  }
}
//article_abstract: null
//article_content: null
//article_createTime: "2019-07-19T03:40:23.829Z"
//article_link: null
//article_modifyTime: "2019-07-19T03:40:23.829Z"
//article_title: null
//article_writer: null
//secType: null
//tag: null
//type: null
</script>

<style scoped lang="less">
.popup-article{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  background: rgba(0,0,0,0.6);
  .popup-form{
    background: white;
    position: absolute;
    width: 460px;
    margin-left: -230px;
    padding: 20px 20px 0 0;
    box-sizing: border-box;
    left: 50%;
    top: 50px;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    .line{
      text-align: center;
    }
  }
}
</style>
