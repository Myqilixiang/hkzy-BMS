<template>
  <div class="dashboarda">
    <el-row :gutter="6"
            class="top-panel">
      <el-col :span="3">
        <div class="grid-content bg-purple">当日处方总数量</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">毒麻精类药品处方</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">抗菌类药品处方</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">抗肿瘤类药品处方</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">基药类药品处方</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">医保类药品处方</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">针剂类药品处方</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">大额处方数量</div>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            class="chart-panel">
      <el-col :span="7">
        <div class="grid-content bg-purple">审核不通过处方原因实时滚动</div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">大额处方数量</div>
      </el-col>
      <el-col :span="7">

        <div class="grid-content bg-purple">大额处方数量</div>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            class="chart-panel">
      <el-col :span="7">
        <div class="grid-content bg-purple">大额处方数量</div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">大额处方数量</div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple">大额处方数量</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { MonitoringService } from '@/api'
export default {
  data() {
    return {

    }
  },
  mounted() {
    MonitoringService.getDailyPrescriptionMedicineStatistics({

    }).then(data => {
      console.log(data)
    })
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
