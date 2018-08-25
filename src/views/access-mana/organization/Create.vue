<template>
  <div class="create">
    <el-dialog title="添加用户"
               :visible.sync="dialogVisible"
               @close="closedialog"
               width="50%"
               center>
      <el-form size="small"
               ref="form"
               label-width="120px"
               :model="userInfo">
        <el-form-item label="人员姓名">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="userInfo.id_card"></el-input>
        </el-form-item>
        <el-form-item label="医疗机构内工号">
          <el-input v-model="userInfo.job_code"></el-input>
        </el-form-item>
        <el-form-item label="科室代码">
          <el-input v-model="userInfo.dept_code"></el-input>
        </el-form-item>
        <el-form-item label="人员类型">
          <el-select v-model="userInfo.type"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="userInfo.gender"
                    :label="'1'">男</el-radio>
          <el-radio v-model="userInfo.gender"
                    :label="'2'">女</el-radio>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="userInfo.telephone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success"
                     @click="submit">提交</el-button>
          <el-button type="warning"
                     @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { AccessService } from '@/api'

export default {
  data() {
    return {
      dialogVisible: true,
      userInfo: {
        'type': 1,
        'name': '',
        'job_code': '',
        'id_card': '',
        'occupation_no': '',
        'level': '',
        'sign': '',
        'dept_code': '',
        'gender': '1',
        'telephone': '',
        'birthday': 0,
        'title': '',
        'pydm': 'string',
        'routing_key': 'string',
        'wx_open_id': 'string',
        'created_at': 0,
        'updated_at': 0,
        'created_by': 'string',
        'updated_by': 'string',
        'obsoleted': false,
        'sort_value': 1,
        'hosp_id': 'string'
      },
      options: [
        { label: '其他', value: 0 },
        { label: '药师', value: 1 },
        { label: '医师', value: 2 },
        { label: '护士', value: 3 }]
    }
  },
  methods: {
    closedialog(msg) {
      if (msg) {
        this.$emit('closedialog', 'refresh')
      } else {
        this.$emit('closedialog')
      }
    },
    submit() {
      AccessService.createUser(this.userInfo).then(data => {
        if (data.status === 200) {
          this.closedialog(true)
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style>
.create .el-dialog__body {
  max-height: 70vh;
  overflow: scroll;
}
</style>
