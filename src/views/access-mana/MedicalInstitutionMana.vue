<template>
  <div class="medical">
    <div v-if="!addMedicalState">
      <el-form :inline="true"
               size="small"
               :model="conditionData">
        <el-form-item label="机构代码">
          <el-input clearable
                    @clear="getList"
                    v-model="conditionData.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="getList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success"
                     @click="createMedicalInstitution">新增医疗机构</el-button>
        </el-form-item>
      </el-form>
      <el-carousel height="600px">
        <el-carousel-item v-for="item in list"
                          :key="item.id">
          <medical-card :ref="item.id"
                        @popMsg="handleMsg"
                        :medical="item"></medical-card>
        </el-carousel-item>
      </el-carousel>
    </div>
    <medical-card :addMedical="addMedicalState"
                  @popMsg="handleMsg"
                  v-if="addMedicalState"></medical-card>
  </div>
</template>

<script>
import { AccessService } from '@/api'
import MedicalCard from './MedicalCard'
export default {
  components: { MedicalCard },
  data() {
    return {
      addMedicalState: false,
      activeMedical: {},
      conditionData: {
        id: ''
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 5
      },
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleMsg(msg) {
      if (msg) {
        this.getList()
      }
      this.addMedicalState = false
    },
    deleteHosp() { },
    editHosp() { },
    getList() {
      const queryObject = this.conditionData.id ? {
        where: {
          'code': this.conditionData.id
        }
      } : {}
      AccessService.getHospitalsList(queryObject).then(data => {
        this.list = data.data
      })
    },
    createMedicalInstitution() {
      this.addMedicalState = true
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
.medical {
  padding: 20px 20px;
}
</style>
<style lang="scss">
.medical {
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
