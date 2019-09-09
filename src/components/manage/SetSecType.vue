<template>
  <div class="popup-article">
    <el-form class="popup-form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="type">
        <el-col :span="11">
          <el-select v-model="ruleForm.type" placeholder="请选择一级分类">
            <el-option label="分类一" value="分类一"></el-option>
            <el-option label="分类二" value="分类二"></el-option>
          </el-select>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-select v-model="ruleForm.secType" placeholder="请选择二级分类">
            <el-option label="分类一一" value="分类一一"></el-option>
            <el-option label="分类二二" value="分类二二"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="文章标签" prop="tags">
        <el-checkbox-group v-model="ruleForm.tags">
          <el-checkbox label="美食/餐厅线上活动" name="tags"></el-checkbox>
          <el-checkbox label="地推活动" name="tags"></el-checkbox>
          <el-checkbox label="线下主题活动" name="tags"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="tags"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="文章简介" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import myEdit from '@/components/manage/edit'
import { mapState } from 'vueX'

export default {
  components: {
  },
  mounted () {
    console.log(myEdit)
  },
  computed: {
    ...mapState(['csrfToken'])
  },
  data() {
    return {
      ruleForm: {
        title: '',
        type: '',
        secType: '',
        tags: [],
        description: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        secType: [
          { required: true, message: '请选择活动区域2', trigger: 'change' }
        ],
        tags: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    hidePopup () {
      this.$emit('hidePopup')
    },
    submitForm(formName) {
      let vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //submit
          console.log(this.ruleForm)
          let data = {
            article_title: this.ruleForm.title,
            article_abstract: this.ruleForm.description,
            type_num: 1,
            type_name: this.ruleForm.type,
            secType_name: this.ruleForm.secType,
            tag_name: this.ruleForm.tags,
            csrfToken: this.csrfToken,
          }
          let param = new URLSearchParams()
          for (let key in data) {
            param.append(key, data[key])
          }
          axios.post('/api/manage/articles', param).then((res) => {
            console.log('res=>', res)
          })
        } else {
          alert('error submit!!');
          return false;
        }
      });
      this.hidePopup()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.hidePopup()
    }
  }
}
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
