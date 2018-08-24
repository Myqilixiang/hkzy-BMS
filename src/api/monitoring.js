import request from '@/utils/request'
class MonitoringService {
  /**
   *获取 每日处方按药品类型统计 列表
   *
   * @param {*} username
   * @param {*} password
   * @returns
   * @memberof MonitoringService
   */
  getDailyPrescriptionMedicineStatistics(query) {
    return request({
      url: '/DailyPrescriptionMedicineStatistics',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
}
export default new MonitoringService()
