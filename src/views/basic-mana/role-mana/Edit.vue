<template>
  <div class="edit">
    <el-dialog title="修改角色"
               :visible.sync="dialogVisible"
               @close="closedialog"
               width="70%"
               center>
      <el-form size="small"
               ref="form"
               label-width="120px"
               :model="roleInfo">
        <el-form-item label="角色名">
          <el-input v-model="roleInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="角色代码">
          <el-input v-model="roleInfo.role_code"></el-input>
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
      roleInfo: {}
    }
  },
  props: ['role'],
  mounted() {
    this.roleInfo = this.role
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
      BasicService.updateRole(this.roleInfo).then(data => {
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
