<template>
  <div class="user">
    <el-row>
      <el-card>
        <div class="clearfix"
             slot="header">
          <el-col :span="24">
            <el-form :inline="true"
                     size="small"
                     ref="form"
                     :model="conditionData"
                     class="demo-form-inline">
              <el-form-item>
                <el-input v-model="conditionData.username"
                          placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="search">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="success"
                           @click="addUser">添加用户</el-button>
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
              <el-table-column prop="job_code"
                               align="center"
                               label="工号">
              </el-table-column>
              <el-table-column prop="name"
                               align="center"
                               label="姓名">
              </el-table-column>
              <el-table-column align="center"
                               label="人员类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==0">其他</span>
                  <span v-if="scope.row.type==1">药师</span>
                  <span v-if="scope.row.type==2">医师</span>
                  <span v-if="scope.row.type==3">护士</span>
                </template>
              </el-table-column>
              <el-table-column prop="id_card"
                               align="center"
                               label="身份证号">
              </el-table-column>
              <el-table-column prop="level"
                               align="center"
                               label="级别">
              </el-table-column>
              <el-table-column prop="title"
                               align="center"
                               label="职务">
              </el-table-column>
              <el-table-column prop="dept_code"
                               align="center"
                               label="科室代码">
              </el-table-column>
              <el-table-column prop="created_at"
                               align="center"
                               label="创建时间">
              </el-table-column>
              <el-table-column width="80"
                               align="center"
                               label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.obsoleted">作废</span>
                  <span v-else>未作废</span>
                </template>
              </el-table-column>
              <el-table-column align="center"
                               width="160"
                               label="操作">
                <template slot-scope="scope">
                  <el-button type="primary"
                             @click="editUser(scope.row.userId)"
                             size="small">
                    修改
                  </el-button>
                  <el-button type="danger"
                             @click="delUser(scope.row.id,scope.row.name)"
                             size="small">
                    删除
                  </el-button>
                </template>
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
    <EditDialog :user="selectedItem"
                @closedialog="closeEditDialog"
                v-if="editDialogVisable"></EditDialog>

    <CreateDialog @closedialog="closeCreateDialog"
                  v-if="createDialogVisable">
    </CreateDialog>
  </div>
</template>

<script>
import { BasicService } from '@/api'
import EditDialog from './Edit'
import CreateDialog from './Create'
export default {
  components: {
    EditDialog, CreateDialog
  },
  data() {
    return {
      editDialogVisable: false,
      createDialogVisable: false,
      conditionData: {
        username: ''
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      selectedUser: {},
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(query) {
      BasicService.getNumOfUsers(query || {}).then(data => {
        this.total = data.data.count
        const queryObj = query ? {
          limit: this.listQuery.limit,
          skip: this.listQuery.limit * (this.listQuery.page - 1),
          where: query
        } : {
          limit: this.listQuery.limit,
          skip: this.listQuery.limit * (this.listQuery.page - 1)
        }
        BasicService.getUserList(queryObj).then(data => {
          this.list = data.data
        })
      })
    },
    search() {
      this.getList({ name: this.conditionData.username })
    },
    showEditDialog(user) {
      this.selectedUser = user
      this.editDlialogVisable = true
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    addUser() {
      this.createDialogVisable = true
    },
    closeCreateDialog(msg) {
      if (msg) {
        this.getList()
      }
      this.createDialogVisable = false
    },
    closeEditDialog(msg) {
      if (msg) {
        this.getList()
      }
      this.editDialogVisable = false
    },
    delUser(userid, username) {
      this.$confirm(`确认删除${username}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        BasicService.deleteUser(userid).then(data => {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.user {
  padding: 20px 20px;
  /deep/ .el-form-item {
    margin-bottom: 0;
  }
}
</style>
