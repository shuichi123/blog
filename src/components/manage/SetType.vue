<template>
  <div class="set-type">
    <el-button-group>
      <el-button class="" type="primary" size="small" icon="el-icon-circle-plus-outline" @click="createType">新建</el-button>
      <el-button class="" type="primary" size="small" icon="el-icon-delete" @click="">删除</el-button>
      <el-button class="" type="primary" size="small" icon="el-icon-refresh-right" @click="">激活</el-button>
      <el-button class="" type="primary" size="small" :icon="checkIcon" @click="">禁用</el-button>
    </el-button-group>
    <div class="popup-set-type" v-if="popupSetType">
      <el-form class="popup-form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类属性" prop="attr">
          <el-select v-model="ruleForm.attr" placeholder="请选择分类属性" @change="changeAttr">
            <el-option label="一级分类" value="type-1"></el-option>
            <el-option label="二级分类" value="type-2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :class="classname" label="所属分类" prop="type">
          <el-select v-model="ruleForm.type" :disabled="isdisabled" placeholder="请选择一级分类">
            <el-option v-for="type in types" :label="type.name" :value="type.num"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import myEdit from '@/components/manage/edit'
import { mapState, mapMutations } from 'vueX'

export default {
  components: {
  },
  mounted () {
    this.getTypes()
  },
  computed: {
    rules() {
      return {
        name: [
          { required: true, message: '分类名称', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        attr: [
          { required: true, message: '请选择分类属性', trigger: 'change' }
        ],
        type: [
          { required: !this.isdisabled, message: '请选择所属分类', trigger: 'change' }
        ],
      }
    },
    ...mapState({
      csrfToken: (state) => state.csrfToken,
      types: (state) => state.manageData.types,
    })
  },
  data() {
    return {
      ruleForm: {
        name: '',
        attr: '',
        type: '',
        num: '',
      },
      classname: '',//'is-required'
      isdisabled: false,
      popupSetType: false,
    }
  },
  methods: {
    hidePopup () {
      this.$emit('hidePopup')
    },
    createType () {
      this.popupSetType = true
    },
    changeAttr (attr) {
      console.log(attr)
      if (attr === 'type-1') {
        this.isdisabled = true
        this.classname = ''
      } else if (attr==='type-2') {
        this.isdisabled = false
        this.classname = 'is-required'
      }
    },
    getTypes () {
      axios.get('/api/manage/type').then((response) => {
        let types = []
        for (let i=0; i<response.data.length; i++) {
          types.push({num: response.data[i].pk, name: response.data[i].fields.type_name})
        }
        this.setManageTypes(types)
        console.log(this.types)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //submit
          if (this.ruleForm.attr === 'type-1') {
            console.log(this.ruleForm)
            let data = {
              type_name: this.ruleForm.name,
              type_num: this.ruleForm.num,
              csrfToken: this.csrfToken,
            }
            let param = new URLSearchParams()
            for (let key in data) {
              param.append(key, data[key])
            }
            axios.post('/api/manage/type', param).then((res) => {
              console.log('res=>', res)
            })
          } else if (this.ruleForm.attr === 'type-2') {
            let data = {
              secType_num: this.ruleForm.num,
              secType_name: this.ruleForm.name,
              type_id: this.ruleForm.type,
              csrfToken: this.csrfToken,
            }
            let param = new URLSearchParams()
            for (let key in data) {
              param.append(key, data[key])
            }
            axios.post('/api/manage/secType', param).then((res) => {
              console.log('res=>', res)
            })
          }
        } else {
          alert('error submit!!');
        }
      });
      this.popupSetType = false
      this.$refs[formName].resetFields()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    ...mapMutations(['setManageTypes']),
  }
}
</script>

<style scoped lang="less">
.popup-set-type{
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
