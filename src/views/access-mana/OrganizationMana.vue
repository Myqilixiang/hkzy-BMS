<template>
  <div class="refund">
    <el-card>
      <el-row>
        <el-col :span="5">
          <el-tree :load="loadDepartment"
                   lazy
                   :props="defaultProps"
                   @node-click="handleNodeClick"></el-tree>
        </el-col>
        <el-col :span="19">
          <el-card v-if="selectedDepartment">
            <div class="clearfix"
                 slot="header">
              {{selectedDepartment.name}}
            </div>
            <div class="clearfix">

            </div>
          </el-card>
          <el-card>
            <div class="clearfix"
                 slot="header">
              <el-col :span="24">
                <el-form :inline="true"
                         ref="form"
                         size="small"
                         :model="conditionData"
                         class="demo-form-inline">
                  <el-form-item label="ID">
                    <el-input v-model="conditionData.refundId"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary"
                               @click="onSubmit">查询</el-button>
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
                  <el-table-column prop="name"
                                   align="center"
                                   label="姓名">
                  </el-table-column>
                  <el-table-column align="center"
                                   label="性别">
                    <template slot-scope="scope">
                      <span v-if="scope.row.gender==1">男</span>
                      <span v-if="scope.row.gender==2">女</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="title"
                                   align="center"
                                   label="职务">
                  </el-table-column>
                  <el-table-column align="center"
                                   label="人员类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type==1">药师</span>
                      <span v-if="scope.row.type==2">医师</span>
                      <span v-if="scope.row.type==3">护士</span>
                      <span v-if="scope.row.type==0">其他</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dept_code"
                                   align="center"
                                   label="科室代码">
                  </el-table-column>
                  <el-table-column prop="telephone"
                                   align="center"
                                   label="联系电话">
                  </el-table-column>
                  <el-table-column align="center"
                                   label="操作">
                    <template slot-scope="scope">
                      <el-button type="warning"
                                 @click="showEditDialog(scope.row)">编辑</el-button>
                      <el-button type="danger"
                                 @click="delPerson(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </div>
          </el-card>
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
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { AccessService } from '@/api'
export default {
  data() {
    return {
      defaultProps: {
        label: 'name',
        leaf: 'leaf'
      },
      conditionData: {
        refundId: '',
        telNum: '',
        end: ''
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      list: [

      ],
      selectedDepartment: ''
    }
  },
  mounted() {
    AccessService.getHospitalsList({}).then(data => {
      this.treeData = data.data
    })
  },
  methods: {
    getList() {
      AccessService.getPersonNumOfSelectedDepartments({
        hosp_id: this.selectedDepartment.hosp_id,
        dept_code: this.selectedDepartment.dept_code
      }).then(data => {
        this.total = data.data.count
        AccessService.getPersonOfSelectedDepartments({
          where: {
            hosp_id: this.selectedDepartment.hosp_id,
            dept_code: this.selectedDepartment.dept_code
          },
          limit: this.listQuery.limit,
          skip: this.listQuery.limit * (this.listQuery.page - 1)
        }).then(data => {
          this.list = data.data
        })
      })
    },
    onSubmit() {

    },
    loadDepartment(node, resolve) {
      console.log(node)
      if (node.level === 0) {
        console.log(node)
        AccessService.getHospitalsList({}).then(data => {
          const tempdata = data.data
          tempdata.leaf = false
          resolve(tempdata)
        })
      } else if (node.level === 1) {
        AccessService.getDepartmentsOfSelectedHospital({ where: { hosp_id: node.data.id, parent_id: '' }}).then(data => {
          const tempdata = data.data.map(item => {
            const tempItem = item
            tempItem.name = item.dept_name
            tempItem.leaf = true
            return tempItem
          })
          resolve(tempdata)
        })
      } else {
        AccessService.getChildrenOfSelectedDepartment({ where: { parent_id: node.data.id }}).then(data => {
          const tempdata = data.data.map(item => {
            const tempItem = item
            tempItem.name = item.dept_name
            tempItem.leaf = true
            return tempItem
          })
          resolve(tempdata)
        })
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleNodeClick(val) {
      this.selectedDepartment = val
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
