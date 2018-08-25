<template>
  <div class="dashboarda">
    <el-row :gutter="6"
            class="top-panel">
      <el-col :span="3">
        <div class="grid-content bg-purple">当日处方总数量{{countData.total}}</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">毒麻精类药品处方{{countData.poison_count}}</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">抗菌类药品处方{{countData.antibacterial_count}}</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">抗肿瘤类药品处方{{countData.antineoplastic_count}}</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">基药类药品处方{{countData.basic_count}}</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">医保类药品处方{{countData.insurance_count}}</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">针剂类药品处方{{countData.injection_count}}</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">大额处方数量{{countData.expensive_count}}</div>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            class="chart-panel">
      <el-col :span="7">
        <div class="grid-content bg-purple">审核不通过处方原因实时滚动 查处方表 按时间排序 取前几个</div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">今日处方流转 数据无从查询 暂时使用家数据</div>
      </el-col>
      <el-col :span="7">

        <div class="grid-content bg-purple">今日药师审核数量top10 查询每日药师审核统计 include person</div>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            class="chart-panel">
      <el-col :span="7">
        <div class="grid-content bg-purple">药师实时审核处方数量 查询每日药师审核统计表 排序时间前8 携带person 拿到信息</div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">处方来源 查询处方表include hospital</div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple">每个矿工余额 数据来源未知</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { MonitoringService } from '@/api'
export default {
  data() {
    return {
      countData: {
        total: 0,
        poison_count: 0,
        antibacterial_count: 0,
        antineoplastic_count: 0,
        basic_count: 0,
        insurance_count: 0,
        injection_count: 0,
        expensive_count: 0
      },
      todayTimestamp: new Date(new Date().toLocaleDateString()).getTime(),
      prescriptionReason: [],
      prescriptionSource: [],
      auditionTopTen: [],
      prescriptionAuditionCount: []
    }
  },
  mounted() {
    this.initCountData()
    this.initPrescriptionReason()
    this.initPrescriptionSource()
    this.initAuditionTopTen()
    this.initPrescriptionAuditionCount()
  },
  methods: {
    getNowFormatDate() {
      var date = new Date()
      var seperator1 = '-'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    getDateFromTimestamp(timestamp) {
      var date = new Date(1535122541 * 1000)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      return Y + M + D
    },
    initCountData() {
      // 获取不同药品类型的数量
      MonitoringService.getDailyPrescriptionMedicineStatistics({
        limit: 1,
        order: 'updated_at DESC'
      }).then(data => {
        this.countData = data.data[0]
      })
    },
    initPrescriptionReason() {
      // 获取审核不通过处方原因滚动数据
      MonitoringService.getPrescription({
        where: {
          created_at: {
            gte: this.todayTimestamp
          }
        },
        order: 'updated_at DESC',
        include: 'doctor',
        limit: 6
      }).then(data => {
        this.prescriptionReason = data.data.map(item => {
          return {
            time: this.getDateFromTimestamp(item.updated_at),
            prescripId: item.hosp_prescrip_id,
            reason: item.reason,
            doctor: item.doctor.name

          }
        })
        console.log(this.prescriptionReason)
      })
    },
    initPrescriptionSource() {
      MonitoringService.getPrescription({
        where: {
          created_at: {
            gte: this.todayTimestamp
          }
        },
        include: 'hospital'
      }).then(data => {
        const temp = {}
        const total = data.data.length
        data.data.forEach(item => {
          if (!temp[item.hospital.type]) {
            temp[item.hospital.type] = 1
          } else {
            temp[item.hospital.type] += 1
          }
        })
        this.prescriptionSource = Object.keys(temp).map(item => {
          return {
            label: item,
            value: (temp[item] / total).toFixed(2) * 100
          }
        })
        console.log(this.prescriptionSource)
      })
    },
    initAuditionTopTen() {
      MonitoringService.getPrescriptionAuition({
        where: {
          created_at: {
            gte: this.todayTimestamp
          }
        },
        limit: 10,
        order: 'total DESC'
      }).then(data => {
        this.auditionTopTen = data.data.map((item, index) => {
          return {
            'label': `第${index + 1}名`,
            'value': item.total
          }
        })
        console.log(this.auditionTopTen)
      })
    },
    initPrescriptionAuditionCount() {
      MonitoringService.getPharmacistPrescriptionAuition({
        where: {
          created_at: {
            gte: this.todayTimestamp
          }
        },
        limit: 8,
        order: 'updated_at DESC',
        include: {
          person: 'hospital'
        }
      }).then(data => {
        this.prescriptionAuditionCount = data.data.map(item => {
          return {
            name: item.person.name,
            level: item.person.level,
            count: item.adopt_count,
            hospital: item.person.hospital.name
          }
        })
        console.log(this.prescriptionAuditionCount)
      })
    }
  }
}
</script>
<style lang="scss">
.dashboarda {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .top-panel {
    .grid-content {
      border-radius: 4px;
      min-height: 60px;
    }
  }
  .chart-panel {
    .grid-content {
      border-radius: 4px;
      min-height: 280px;
    }
  }
}
</style>

<style scoped lang="scss">
.dashboarda {
  padding: 20px 20px;
}
</style>
