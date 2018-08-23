<template>
  <div class="module">
    <el-dialog title="编辑权限"
               :visible.sync="dialogVisible"
               @close="closedialog"
               width="70%"
               center>
      <el-checkbox-group v-model="checkList">
        <el-checkbox border
                     v-for="item in moduleList"
                     :key="item.id"
                     :label="item.name">{{item.name}}</el-checkbox>
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
  props: ['role'],
  data() {
    return {
      dialogVisible: true,
      checkList: [],
      moduleList: [],
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
    BasicService.getModuleList({}).then(data => {
      if (data.status === 200) {
        this.moduleList = data.data
        BasicService.getModulesOfSelectedRole(this.role.id).then(data => {
          if (data.status === 200) {
            this.checkList = data.data.map(item => {
              return item.name
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
      // 选中的所有模块
      const selectedModules = this.checkList.map(item => {
        for (let i = 0; i < this.moduleList.length; i++) {
          if (this.moduleList[i].name === item) {
            return this.moduleList[i].id
          }
        }
      })
      // 需要添加的模块
      const addModules = selectedModules.filter(item => {
        return this.originRoles.indexOf(item) === -1
      })
      // 需要删除的关系
      const deleteModules = this.originRoles.filter(item => {
        return selectedModules.indexOf(item) === -1
      })
      let sysRoleModuleMapsIdToDelete = []
      // 获取需要删除的角色模块数据id
      for (let i = 0; i < deleteModules.length; i++) {
        sysRoleModuleMapsIdToDelete.push(await BasicService.getSysRoleModuleMapsId({
          where:
            {
              module_id: deleteModules[i],
              role_id: this.role.id
            }
        }))
      }
      sysRoleModuleMapsIdToDelete = sysRoleModuleMapsIdToDelete.map(item => item.data[0].id)
      // 删除角色模块关联条目
      for (let i = 0; i < sysRoleModuleMapsIdToDelete.length; i++) {
        await BasicService.delModuleOfRole(sysRoleModuleMapsIdToDelete[i])
      }
      // 添加选中的条目
      for (let i = 0; i < addModules.length; i++) {
        await BasicService.addModuleForRole({
          'role_id': this.role.id,
          'module_id': addModules[i],
          'created_at': 0,
          'updated_at': 0,
          'created_by': '',
          'updated_by': '',
          'obsoleted': false,
          'sort_value': 1
        })
      }
      this.$message({
        type: 'success',
        message: '修改成功!'
      })
      this.closedialog()
    }
  }
}
</script>

<style>
.module .el-dialog__body {
  max-height: 70vh;
  overflow: scroll;
}
</style>
