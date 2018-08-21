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
      url: '/Persons/count',
      method: 'get',
      params: {
        where: JSON.stringify(query)
      }
    })
  }
  getUserList(query) {
    return request({
      url: '/Persons',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
  deleteUser(id) {
    return request({
      url: `/Persons/${id}`,
      method: 'delete'
    })
  }
  createUser(userInfo) {
    return request({
      url: `/Persons`,
      method: 'post',
      data: userInfo
    })
  }
  updateUser(userInfo) {
    return request({
      url: `/Persons`,
      method: 'put',
      data: userInfo
    })
  }
}
export default new BasicService()
