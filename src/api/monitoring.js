import request from '@/utils/request'
class MonitoringService {
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
export default new MonitoringService()
