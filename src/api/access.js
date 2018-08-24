import request from '@/utils/request'
class AccessService {
  /**
   *medical institution
   *
   * @param {*} data
   * @returns
   * @memberof AccessService
   */
  updateInstitution(data) {
    return request({
      url: '/Hospitals',
      method: 'put',
      data: data
    })
  }
  createInstitution(data) {
    return request({
      url: '/Hospitals',
      method: 'post',
      data: data
    })
  }
  deleteInstitution(id) {
    return request({
      url: `/Hospitals/${id}`,
      method: 'delete'
    })
  }
  getHospitalsNum(query) {
    return request({
      url: '/Hospitals/count',
      method: 'get',
      params: {
        where: JSON.stringify(query)
      }
    })
  }
  getHospitalsList(query) {
    return request({
      url: '/Hospitals',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
  getDepartmentsOfSelectedHospital(query) {
    return request({
      url: '/Departments',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
  getChildrenOfSelectedDepartment(query) {
    return request({
      url: '/Departments',
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
  getPersonOfSelectedDepartments(query) {
    return request({
      url: `/Persons`,
      method: 'get',
      params: {
        filter: JSON.stringify(query)
      }
    })
  }
  getPersonNumOfSelectedDepartments(query) {
    return request({
      url: `/Persons/count`,
      method: 'get',
      params: {
        where: JSON.stringify(query)
      }
    })
  }
}
export default new AccessService()
