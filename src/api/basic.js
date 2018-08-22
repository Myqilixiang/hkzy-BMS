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
}
export default new BasicService()
