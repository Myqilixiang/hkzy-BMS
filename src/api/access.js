import request from '@/utils/request'
class AccessService {
  login(username, password) {
    // TODO : anshizhushi
    return request({
      url: '/user/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
  }
}
export default new AccessService()
