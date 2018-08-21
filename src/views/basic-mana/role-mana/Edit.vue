<template>
  <div class="edit">
    <el-dialog title="编辑用户权限"
               :visible.sync="dialogVisible"
               @close="closedialog"
               width="70%"
               center>
      <el-card>
        <div class="clearfix"
             slot="header">
          用户
          <el-tag type="success">{{user.userName}}</el-tag>
        </div>
        <div class="clearfix">
          <el-table :data="list"
                    stripe
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    border
                    style="width: 100%">
            <el-table-column prop="roelName"
                             align="center"
                             type="selection">
            </el-table-column>
            <el-table-column prop="roelName"
                             align="center"
                             label="角色">
            </el-table-column>
            <el-table-column label="权限"
                             align="center">
              <template slot-scope="scope">
                <ul>
                  <li v-for="item in Object.keys(scope.row.role)"
                      :key="item">
                    {{item}}.{{scope.row.role[item]}}
                  </li>
                </ul>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-button @click="submit"
                   type="primary">提交</el-button>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { BasicService } from '@/api'

export default {
  data() {
    return {
      dialogVisible: true,
      list: [],
      multipleSelection: []
    }
  },
  props: {
    user:
      {
        type: Object
      }
  },
  mounted() {
    // BasicService.getUserRoles(this.user.userId).then(data => {
    //   this.list = data.data.data.role
    //   this.$nextTick(() => {
    //     const selectedRoles = this.list.filter(item => {
    //       for (let i = 0; i < data.data.data.user.length; i++) {
    //         if (item.roleId === data.data.data.user[i].roleId) {
    //           return true
    //         }
    //       }
    //     })
    //     selectedRoles.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row)
    //     })
    //   })
    // })
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
      const roles = this.multipleSelection.map(item => {
        return item.roleId
      })
      BasicService.updateUserRoles(this.user.userId, roles).then(data => {
        if (data.data.code === 99999) {
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
