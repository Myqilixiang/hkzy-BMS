<template>
  <div class="create">
    <el-dialog title="添加用户"
               :visible.sync="dialogVisible"
               @close="closedialog"
               width="70%"
               center>
      <el-form size="small"
               ref="form"
               label-width="120px"
               :model="userInfo">
        <el-form-item label="账号名">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userInfo.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="人员ID">
          <el-input v-model="userInfo.person_id"></el-input>
        </el-form-item>
        <el-form-item label="医疗结构ID">
          <el-input v-model="userInfo.hosp_id"></el-input>
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
import { BasicService } from '@/api'

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
        'hosp_id': ''
      }
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
      BasicService.createUser(this.userInfo).then(data => {
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
