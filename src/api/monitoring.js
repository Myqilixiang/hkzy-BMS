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
  /**
   *获取 处方信息
   *
   * @param {*} query
   * @returns
   * @memberof MonitoringService
   */
  getPrescription(query) {
    return request({
      url: '/Prescriptions',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
  /**
   *获取 每日处方审核统计信息
   *
   * @param {*} query
   * @returns
   * @memberof MonitoringService
   */
  getPrescriptionAuition(query) {
    return request({
      url: '/DailyPrescriptionAuditionStatistics',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }

  /**
   *获取 每日药师处方审核统计 信息
   *
   * @param {*} query
   * @returns
   * @memberof MonitoringService
   */
  getPharmacistPrescriptionAuition(query) {
    return request({
      url: '/DailyPharmacistPrescriptionAuditionStatistics',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
}
export default new MonitoringService()
