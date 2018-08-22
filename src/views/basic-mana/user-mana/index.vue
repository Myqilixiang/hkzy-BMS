<template>
  <div class="user">
    <el-row>
      <el-card class="card">
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
                          clearable
                          @clear="getList"
                          placeholder="请输入账号名 "></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="getList">查询</el-button>
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
                      v-loading="loading"
                      border
                      style="width: 100%">
              <el-table-column prop="name"
                               align="center"
                               label="账号名">
              </el-table-column>
              <el-table-column prop="username"
                               align="center"
                               label="用户名">
              </el-table-column>
              <el-table-column prop="telephone"
                               align="center"
                               label="电话">
              </el-table-column>
              <el-table-column align="center"
                               width="100"
                               label="账号状态">
                <template slot-scope="scope">
                  <el-tag type="success"
                          v-if="scope.row.status==1">正常</el-tag>
                  <el-tag type="danger"
                          v-else>异常</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="email"
                               align="center"
                               label="邮箱">
              </el-table-column>
              <el-table-column prop="person_id"
                               align="center"
                               label="ID">
              </el-table-column>
              <el-table-column prop="hosp_id"
                               align="center"
                               label="医疗机构ID">
              </el-table-column>
              <el-table-column align="center"
                               width="160"
                               label="角色">
                <template slot-scope="scope">
                  <el-button type="primary"
                             @click="showRoleDialog(scope.row)"
                             size="small">
                    查看/编辑
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column align="center"
                               width="160"
                               label="操作">
                <template slot-scope="scope">
                  <el-button type="primary"
                             @click="showEditDialog(scope.row)"
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
    <EditDialog :user="selectedUser"
                @closedialog="closeEditDialog"
                v-if="editDialogVisable"></EditDialog>

    <CreateDialog @closedialog="closeCreateDialog"
                  v-if="createDialogVisable">
    </CreateDialog>
    <RoleDialog @closedialog="closeRoleDialog"
                :user="selectedUser"
                v-if="roleDialogVisable">
    </RoleDialog>
  </div>
</template>

<script>
import { BasicService } from '@/api'
import EditDialog from './Edit'
import CreateDialog from './Create'
import RoleDialog from './UserRole'
export default {
  components: {
    EditDialog, CreateDialog, RoleDialog
  },
  data() {
    return {
      createDialogVisable: false,
      editDialogVisable: false,
      roleDialogVisable: false,
      conditionData: {
        username: ''
      },
      loading: true,
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
    getList() {
      BasicService.getNumOfUsers(this.conditionData.username ? { name: this.conditionData.username } : {}).then(data => {
        this.total = data.data.count
        const queryObj = this.conditionData.username ? {
          limit: this.listQuery.limit,
          skip: this.listQuery.limit * (this.listQuery.page - 1),
          where: { name: this.conditionData.username }
        } : {
          limit: this.listQuery.limit,
          skip: this.listQuery.limit * (this.listQuery.page - 1)
        }
        BasicService.getUserList(queryObj).then(data => {
          this.loading = false
          this.list = data.data
        })
      })
    },
    showEditDialog(user) {
      this.selectedUser = user
      this.editDialogVisable = true
    },
    showRoleDialog(user) {
      this.selectedUser = user
      this.roleDialogVisable = true
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
    closeRoleDialog() {
      this.roleDialogVisable = false
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
  .card /deep/ .el-form-item {
    margin-bottom: 0;
  }
}
</style>
