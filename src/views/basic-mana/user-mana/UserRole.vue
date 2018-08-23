<template>
  <div class="role">
    <el-dialog title="编辑权限"
               :visible.sync="dialogVisible"
               @close="closedialog"
               width="70%"
               center>
      <el-checkbox-group v-model="checkList">
        <el-checkbox border
                     v-for="item in roleList"
                     :key="item.id"
                     :label="item.role_code">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <el-button @click="submit"
                 type="primary">提交</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { BasicService } from '@/api'

export default {
  props: ['user'],
  data() {
    return {
      dialogVisible: true,
      checkList: [],
      roleList: [],
      originRoles: [],
      userInfo: {
        'name': '',
        'status': '1',
        'telephone': '',
        'email': '',
        'emailVerified': 'string',
        'wx_open_id': 'string',
        'person_id': '',
        'hosp_id': '',
        'realm': 'string',
        'username': '',
        'password': ''// FIXME: 数据库中没有password字段，但是rest返回信息说是必须要填
      }
    }
  },
  mounted() {
    BasicService.getRoleList({}).then(data => {
      if (data.status === 200) {
        this.roleList = data.data
        BasicService.getRolesOfSelectedUser(this.user.id).then(data => {
          if (data.status === 200) {
            this.checkList = data.data.map(item => {
              return item.role_code
            })
            this.originRoles = data.data.map(item => {
              return item.id
            })
          }
        })
      }
    })
  },
  methods: {
    closedialog(msg) {
      if (msg) {
        this.$emit('closedialog', 'refresh')
      } else {
        this.$emit('closedialog')
      }
    },
    async submit() {
      // 选中的所有角色
      const selectedRoles = this.checkList.map(item => {
        for (let i = 0; i < this.roleList.length; i++) {
          if (this.roleList[i].role_code === item) {
            return this.roleList[i].id
          }
        }
      })
      // 需要添加的角色
      const addRoles = selectedRoles.filter(item => {
        return this.originRoles.indexOf(item) === -1
      })
      // 需要删除的关系
      const deleteRoles = this.originRoles.filter(item => {
        return selectedRoles.indexOf(item) === -1
      })
      let sysUserRoleMapsIdToDelete = []
      // 获取需要删除的用户角色数据id
      for (let i = 0; i < deleteRoles.length; i++) {
        sysUserRoleMapsIdToDelete.push(await BasicService.getSysUserRoleMapsId({
          where:
            {
              role_id: deleteRoles[i],
              user_id: this.user.id
            }
        }))
      }
      sysUserRoleMapsIdToDelete = sysUserRoleMapsIdToDelete.map(item => item.data[0].id)
      // 删除用户角色关联条目
      for (let i = 0; i < sysUserRoleMapsIdToDelete.length; i++) {
        await BasicService.delRoleOfUser(sysUserRoleMapsIdToDelete[i])
      }
      // 添加选中的条目
      for (let i = 0; i < addRoles.length; i++) {
        await BasicService.addRoleForUser({
          'role_id': addRoles[i],
          'created_at': 0,
          'updated_at': 0,
          'created_by': '',
          'updated_by': '',
          'obsoleted': false,
          'sort_value': 1,
          'user_id': this.user.id
        })
      }
      this.$message({
        type: 'success',
        message: '修改成功!'
      })
      this.closedialog()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style>
.role .el-dialog__body {
  max-height: 70vh;
  overflow: scroll;
}
</style>
