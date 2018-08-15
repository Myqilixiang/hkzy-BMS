<template>
  <div class="refund">
    <h1>测试列表</h1>
    <hr>
    <el-row>
      <el-card>
        <div class="clearfix"
             slot="header">
          <el-col :span="24">
            <el-form :inline="true"
                     size="small"
                     :model="conditionData"
                     class="demo-form-inline">
              <el-form-item>
                <el-input v-model="conditionData.number"
                          placeholder="手机号|订单号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="conditionData.type"
                           placeholder="请选择">
                  <el-option v-for="item in conditionData.options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-radio v-model="conditionData.end"
                          label="student">学生端</el-radio>
                <el-radio v-model="conditionData.end"
                          label="parent">家长端</el-radio>
              </el-form-item>

              <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>

        </div>
        <el-col :span="24">
          <el-table :data="list"
                    stripe
                    border
                    style="width: 100%">
            <el-table-column prop="date"
                             label="订单ID">
            </el-table-column>
            <el-table-column prop="name"
                             label="用户名称">
            </el-table-column>
            <el-table-column prop="address"
                             label="手机号">
            </el-table-column>
            <el-table-column prop="address"
                             label="商品名">
            </el-table-column>
            <el-table-column prop="address"
                             label="商品原价">
            </el-table-column>
            <el-table-column prop="address"
                             label="购买金额">
            </el-table-column>
            <el-table-column prop="address"
                             label="支付渠道">
            </el-table-column>
            <el-table-column prop="address"
                             label="创建时间">
            </el-table-column>
            <el-table-column prop="address"
                             label="操作">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24">
          <div class="pagination-container">
            <el-pagination background
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="listQuery.page"
                           :page-sizes="[5,10,15, 20]"
                           :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
          </div>

        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conditionData: {
        number: '',
        type: '',
        end: '',
        options: [
          { value: 'tel', label: '手机号' },
          { value: 'order', label: '订单号' }
        ]
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 5
      },
      list: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted() {
    this.total = this.tableData.length
    this.getList()
  },
  methods: {
    getList() {
      this.list = this.tableData.slice((this.listQuery.page - 1) * this.listQuery.limit, (this.listQuery.page - 1) * this.listQuery.limit + this.listQuery.limit)
    },
    onSubmit() {

    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
.refund {
  padding: 20px 20px;
  /deep/ .el-form-item {
    margin-bottom: 0;
  }
}
</style>
