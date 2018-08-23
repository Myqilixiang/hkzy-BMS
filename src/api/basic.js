import request from '@/utils/request'
class BasicService {
  /**
   * USER
   *
   * @param {*} query
   * @returns
   * @memberof BasicService
   */
  getNumOfUsers(query) {
    return request({
      url: '/SysUser/count',
      method: 'get',
      params: {
        where: JSON.stringify(query)
      }
    })
  }
  getUserList(query) {
    return request({
      url: '/SysUser',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
  deleteUser(id) {
    return request({
      url: `/SysUser/${id}`,
      method: 'delete'
    })
  }
  createUser(userInfo) {
    return request({
      url: `/SysUser`,
      method: 'post',
      data: userInfo
    })
  }
  updateUser(userInfo) {
    return request({
      url: `/SysUser`,
      method: 'put',
      data: userInfo
    })
  }
  getRolesOfSelectedUser(id) {
    return request({
      url: `/SysUser/${id}/roles`,
      method: 'get'
    })
  }
  addRoleForUser(data) {
    return request({
      url: `/SysUserRoleMaps`,
      method: 'post',
      data: data
    })
  }
  getSysUserRoleMapsId(query) {
    return request({
      url: `/SysUserRoleMaps`,
      method: 'get',
      params: {
        filter: query
      }
    })
  }
  delRoleOfUser(id) {
    return request({
      url: `/SysUserRoleMaps/${id}`,
      method: 'delete'
    })
  }
  /**
   * role
   *
   * @memberof BasicService
   */
  getNumOfRole(query) {
    return request({
      url: '/SysRoles/count',
      method: 'get',
      params: {
        where: JSON.stringify(query)
      }
    })
  }
  getRoleList(query) {
    return request({
      url: '/SysRoles',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
  createRole(role) {
    return request({
      url: `/SysRoles`,
      method: 'post',
      data: role
    })
  }
  updateRole(role) {
    return request({
      url: `/SysRoles`,
      method: 'put',
      data: role
    })
  }
  deleteRole(id) {
    return request({
      url: `/SysRoles/${id}`,
      method: 'delete'
    })
  }

  /**
   * module
   *
   * @param {*} query
   * @returns
   * @memberof BasicService
   */
  getNumOfModule(query) {
    return request({
      url: '/Modules/count',
      method: 'get',
      params: {
        where: JSON.stringify(query)
      }
    })
  }
  getModuleList(query) {
    return request({
      url: '/Modules',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
  createModule(module) {
    return request({
      url: `/Modules`,
      method: 'post',
      data: module
    })
  }
  deleteModule(id) {
    return request({
      url: `/Modules/${id}`,
      method: 'delete'
    })
  }
  updateModule(module) {
    return request({
      url: `/Modules`,
      method: 'put',
      data: module
    })
  }
}
export default new BasicService()
