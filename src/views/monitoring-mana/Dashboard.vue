<template>
  <div class="refund">
    <h1>测试列表</h1>
    <hr>
    <el-row>
      <el-card>
        <div class="clearfix"
             slot="header">
          删除选项
        </div>
        <div class="clearfix">
          <el-col :span="24">
            <el-form ref="form"
                     size="small"
                     :model="conditionData"
                     label-width="100px">
              <el-form-item label="Question ID">
                <el-input v-model="conditionData.taskId"
                          placeholder="需要清除的ID"></el-input>
              </el-form-item>
              <el-form-item label="删除原因">
                <el-input v-model="conditionData.reason"
                          placeholder="请输入删除原因"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">清除</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conditionData: {
        taskId: '',
        reason: ''
      }
    }
  },
  mounted() {

  },
  methods: {

  }
}

</script>

<style scoped lang="scss">
.refund {
  padding: 20px 20px;
}
</style>
