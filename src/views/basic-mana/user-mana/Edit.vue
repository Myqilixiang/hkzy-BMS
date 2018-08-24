<template>
  <div class="edit">
    <el-dialog title="修改用户"
               :visible.sync="dialogVisible"
               @close="closedialog"
               width="70%"
               center>
      <el-form size="small"
               ref="form"
               label-width="120px"
               :model="userInfo">
        <el-form-item label="账号名">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userInfo.telephone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userInfo.password"></el-input>
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
      userInfo: {}
    }
  },
  props: ['user'],
  mounted() {
    this.userInfo = this.user
    this.userInfo.password = ''// FIXME: 数据库中没有password字段，但是rest返回信息说是必须要填
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
      BasicService.updateUser(this.userInfo).then(data => {
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
.edit .el-dialog__body {
  max-height: 70vh;
  overflow: scroll;
}
</style>
