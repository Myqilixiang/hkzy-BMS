import request from '@/utils/request'
class LoginService {
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
  getInfo(token) {
    return request({
      url: '/user/info',
      method: 'get',
      params: {
        token
      }
    })
  }
  logout() {
    return request({
      url: '/user/logout',
      method: 'post'
    })
  }
}
export default new LoginService()
