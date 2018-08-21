<template>
  <div class="medical">
    <el-row>
      <el-card>
        <div class="clearfix"
             slot="header">
          <el-col :span="24">
            <el-form :inline="true"
                     size="small"
                     :model="conditionData">
              <el-form-item label="机构代码">
                <el-input v-model="conditionData.id"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="success"
                           @click="onSubmit">新增医疗机构</el-button>
              </el-form-item>
            </el-form>
          </el-col>

        </div>
        <el-col :span="24">
          <el-table :data="list"
                    stripe
                    border
                    style="width: 100%">
            <el-table-column label="机构类型"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.type==1">区域审方中心</span>
                <span v-if="scope.row.type==11">公立医院</span>
                <span v-if="scope.row.type==12">私立医院</span>
                <span v-if="scope.row.type==13">互联网医院</span>
                <span v-if="scope.row.type==21">药房</span>
              </template>
            </el-table-column>
            <el-table-column prop="name"
                             align="center"
                             label="名称">
            </el-table-column>
            <el-table-column prop="code"
                             label="组织结构代码"
                             align="center">
            </el-table-column>
            <el-table-column label="医疗机构评级"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.level==1">区域审方中心</span>
                <span v-if="scope.row.level==11">丙</span>
                <span v-if="scope.row.level==12">乙</span>
                <span v-if="scope.row.level==13">甲</span>
                <span v-if="scope.row.level==21">二丙</span>
                <span v-if="scope.row.level==22">二乙</span>
                <span v-if="scope.row.level==23">二甲</span>
                <span v-if="scope.row.level==31">三丙</span>
                <span v-if="scope.row.level==32">三乙</span>
                <span v-if="scope.row.level==33">三甲</span>
                <span v-if="scope.row.level==1">一星</span>
                <span v-if="scope.row.level==2">两星</span>
                <span v-if="scope.row.level==3">三星</span>
                <span v-if="scope.row.level==4">四星</span>
                <span v-if="scope.row.level==5">五星</span>
              </template>
            </el-table-column>
            <el-table-column label="合作方式"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.cooperation_mode==1">默认</span>
              </template>
            </el-table-column>
            <el-table-column prop="expire_time"
                             align="center"
                             label="服务终止时间">
            </el-table-column>
            <el-table-column prop="created_at"
                             align="center"
                             label="创建时间">
            </el-table-column>
            <el-table-column prop="updated_at"
                             align="center"
                             label="更新时间">
            </el-table-column>
            <el-table-column label="作废标记"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.obsoleted">作废</span>
                <span v-else>未作废</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center"
                             width="150px">
              <template slot-scope="scope">
                <el-button type="warning"
                           @click="editHosp(scope.row)"
                           size="small">
                  编辑
                </el-button>
                <el-button type="danger"
                           @click="deleteHosp(scope.row)"
                           size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24">
          <div class="pagination-container">
            <el-pagination background
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="listQuery.page"
                           :page-sizes="[5,10,15, 20]"
                           :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
          </div>

        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { AccessService } from '@/api'

export default {
  data() {
    return {
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
    AccessService.getHospitalsNum({}).then(data => {
      this.total = data.data.count
      AccessService.getHospitalsList(
        {
          limit: this.listQuery.limit,
          skip: this.listQuery.limit * (this.listQuery.page - 1)
        }).then(data => {
        this.list = data.data
      })
    })
  },
  methods: {
    deleteHosp() { },
    editHosp() { },
    getList() {
      AccessService.getPersonNumOfSelectedDepartments({
        hosp_id: this.selectedDepartment.hosp_id,
        dept_code: this.selectedDepartment.dept_code
      }).then(data => {
        this.total = data.data.count
        AccessService.getPersonOfSelectedDepartments({
          where: {
            hosp_id: this.selectedDepartment.hosp_id,
            dept_code: this.selectedDepartment.dept_code
          },
          limit: this.listQuery.limit,
          skip: this.listQuery.limit * (this.listQuery.page - 1)
        }).then(data => {
          this.list = data.data
        })
      })
    },
    onSubmit() {

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
  /deep/ .el-form-item {
    margin-bottom: 0;
  }
}
</style>
