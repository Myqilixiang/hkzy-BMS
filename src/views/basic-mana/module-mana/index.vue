<template>
  <div class="module">
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
                <el-input v-model="conditionData.moduleName"
                          clearable
                          @clear="getList"
                          placeholder="请输入模块名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="getList">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="success"
                           @click="addRole">添加模块</el-button>
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
                               label="模块名">
              </el-table-column>
              <el-table-column align="center"
                               label="状态">
                <template slot-scope="scope">
                  <el-tag type="success"
                          v-if="scope.row.status==1">正常</el-tag>
                  <el-tag type="danger"
                          v-else>异常</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="created_at"
                               align="center"
                               label="创建时间">
              </el-table-column>
              <el-table-column label="作废标记"
                               align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.obsoleted">作废</span>
                  <span v-else>未作废</span>
                </template>
              </el-table-column>
              <el-table-column label="模块类型"
                               align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1">系统页面</span>
                  <span v-if="scope.row.type==2">医生端模块</span>
                </template>
              </el-table-column>
              <el-table-column align="center"
                               width="160"
                               label="操作">
                <template slot-scope="scope">
                  <el-button type="warning"
                             @click="showEditDialog(scope.row)"
                             size="small">
                    修改
                  </el-button>
                  <el-button type="danger"
                             @click="delModule(scope.row.id,scope.row.name)"
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
    <EditDialog :module="selectedModule"
                @closedialog="closeEditDialog"
                v-if="editDialogVisable"></EditDialog>

    <CreateDialog @closedialog="closeCreateDialog"
                  v-if="createDialogVisable">
    </CreateDialog>
    <AuthDialog @closedialog="closeRoleDialog"
                :module="selectedModule"
                v-if="roleDialogVisable">
    </AuthDialog>
  </div>
</template>

<script>
import { BasicService } from '@/api'
import EditDialog from './Edit'
import CreateDialog from './Create'
import AuthDialog from './RoleAuth'
export default {
  components: {
    EditDialog, CreateDialog, AuthDialog
  },
  data() {
    return {
      createDialogVisable: false,
      editDialogVisable: false,
      roleDialogVisable: false,
      conditionData: {
        moduleName: ''
      },
      loading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      selectedModule: {},
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      BasicService.getNumOfModule(this.conditionData.moduleName ? { name: this.conditionData.moduleName } : {}).then(data => {
        this.total = data.data.count
        const queryObj = this.conditionData.moduleName ? {
          limit: this.listQuery.limit,
          skip: this.listQuery.limit * (this.listQuery.page - 1),
          where: { name: this.conditionData.moduleName }
        } : {
          limit: this.listQuery.limit,
          skip: this.listQuery.limit * (this.listQuery.page - 1)
        }
        BasicService.getModuleList(queryObj).then(data => {
          this.loading = false
          this.list = data.data
        })
      })
    },
    showEditDialog(module) {
      this.selectedModule = module
      this.editDialogVisable = true
    },
    showRoleDialog(module) {
      this.selectedModule = module
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
    addRole() {
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
    delModule(moduleId, moduleName) {
      this.$confirm(`确认删除${moduleName}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        BasicService.deleteModule(moduleId).then(data => {
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
.module {
  padding: 20px 20px;
  .card /deep/ .el-form-item {
    margin-bottom: 0;
  }
}
</style>
