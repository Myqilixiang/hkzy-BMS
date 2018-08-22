<template>
  <div class="edit">
    <el-dialog title="修改模块"
               :visible.sync="dialogVisible"
               @close="closedialog"
               width="70%"
               center>
      <el-form size="small"
               ref="form"
               label-width="120px"
               :model="moduleInfo">
        <el-form-item label="模块名">
          <el-input v-model="moduleInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="模块类型">
          <el-select v-model="moduleInfo.type"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色代码">
          <el-input v-model="moduleInfo.role_code"></el-input>
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
      moduleInfo: {},
      options: [
        { label: '系统页面', value: '1' },
        { label: '医生端模块', value: '2' }]
    }
  },
  props: ['module'],
  mounted() {
    this.moduleInfo = this.module
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
      BasicService.updateModule(this.moduleInfo).then(data => {
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
