<template>
  <div class="refund">
    <h1>模块列表</h1>
    <hr>
    <el-row>
      <el-card>
        <div class="clearfix"
             slot="header">
          <el-col :span="24">
            <el-form :inline="true"
                     ref="form"
                     size="small"
                     :model="conditionData"
                     class="demo-form-inline">
              <el-form-item label="APP">
                <el-select v-model="conditionData.type"
                           placeholder="请选择">
                  <el-option v-for="item in conditionData.options"
                             :key="item.title"
                             :label="item.title"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="搜索">
                <el-input v-model="conditionData.telNum"
                          placeholder="请输入模块名称或模块key"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="addModule">添加模块</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
        <div class="clearfix">
          <el-col :span="24">
            <el-table :data="list"
                      stripe
                      border
                      style="width: 100%">
              <el-table-column prop="date"
                               label="模块名称">
              </el-table-column>
              <el-table-column prop="name"
                               label="所属产品">
              </el-table-column>
              <el-table-column prop="address"
                               label="Module KEY">
              </el-table-column>
              <el-table-column prop="address"
                               label="当前状态">
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
        telNum: '',
        type: '',
        options: [
          {
            'productId': '4',
            'productType': '1',
            'title': '象星穿越(适合1-3年级)'
          },
          {
            'productId': '5',
            'productType': '1',
            'title': '热带雨林(适合1-3年级)'
          },
          {
            'productId': '6',
            'productType': '1',
            'title': '小象口语(小象口语：自然拼读学习包1)'
          }
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
    addModule() {
      this.$router.push('/engine/module-create')
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
