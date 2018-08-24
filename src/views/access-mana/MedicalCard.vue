<template>
  <div class="medical-card">
    <el-card class="card">
      <el-form size="small"
               ref="form"
               label-width="120px"
               :model="medicalInfo">
        <el-form-item label="名称:">
          <span v-if="!addMedical && !editState">{{medicalInfo.name}}</span>
          <el-input v-else
                    v-model="medicalInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="组织结构代码:">
          <span v-if="!addMedical && !editState">{{medicalInfo.code}}</span>
          <el-input v-else
                    v-model="medicalInfo.code"></el-input>
        </el-form-item>
        <el-form-item label="机构类型:">
          <div v-if="!addMedical && !editState">
            <span v-if="medicalInfo.type==1">区域审方中心</span>
            <span v-if="medicalInfo.type==11">公立医院</span>
            <span v-if="medicalInfo.type==12">私立医院</span>
            <span v-if="medicalInfo.type==13">互联网医院</span>
            <span v-if="medicalInfo.type==21">药房</span>
          </div>
          <el-select v-model="medicalInfo.type"
                     v-else
                     placeholder="请选择">
            <el-option v-for="item in institutionType"
                       :key="item.value"
                       :label="item.title"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="医疗机构评级:">
          <div v-if="!addMedical && !editState">
            <span v-if="medicalInfo.level==1 && medicalInfo.type!=21">区域审方中心</span>
            <span v-if="medicalInfo.level==11 && medicalInfo.type!=21">丙</span>
            <span v-if="medicalInfo.level==12 && medicalInfo.type!=21">乙</span>
            <span v-if="medicalInfo.level==13 && medicalInfo.type!=21">甲</span>
            <span v-if="medicalInfo.level==21 && medicalInfo.type!=21">二丙</span>
            <span v-if="medicalInfo.level==22 && medicalInfo.type!=21">二乙</span>
            <span v-if="medicalInfo.level==23 && medicalInfo.type!=21">二甲</span>
            <span v-if="medicalInfo.level==31 && medicalInfo.type!=21">三丙</span>
            <span v-if="medicalInfo.level==32 && medicalInfo.type!=21">三乙</span>
            <span v-if="medicalInfo.level==33 && medicalInfo.type!=21">三甲</span>
            <span v-if="medicalInfo.level==1 && medicalInfo.type==21">一星</span>
            <span v-if="medicalInfo.level==2 && medicalInfo.type==21">两星</span>
            <span v-if="medicalInfo.level==3 && medicalInfo.type==21">三星</span>
            <span v-if="medicalInfo.level==4 && medicalInfo.type==21">四星</span>
            <span v-if="medicalInfo.level==5 && medicalInfo.type==21">五星</span>
          </div>
          <el-select v-model="medicalInfo.level"
                     v-else-if="medicalInfo.type!=21"
                     placeholder="请选择">
            <el-option v-for="item in institutionLevel"
                       :key="item.value"
                       :label="item.title"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="medicalInfo.level"
                     v-else-if="medicalInfo.type==21"
                     placeholder="请选择">
            <el-option v-for="item in institutionStar"
                       :key="item.value"
                       :label="item.title"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作废标记:">
          <span v-if="!addMedical && !editState && medicalInfo.obsoleted">作废</span>
          <span v-if="!addMedical && !editState && !medicalInfo.obsoleted">未作废</span>
          <el-select v-if="addMedical || editState"
                     v-model="medicalInfo.obsoleted"
                     placeholder="请选择">
            <el-option v-for="item in obsoletedOptions"
                       :key="item.value"
                       :label="item.title"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div v-if="!addMedical && !editState">
            <el-button type="warning"
                       @click="editState=true"
                       size="small">
              编辑
            </el-button>
            <el-button type="danger"
                       @click="deleteMedical"
                       size="small">
              删除
            </el-button>
          </div>
          <div v-else>
            <el-button type="warning"
                       @click="save"
                       size="small">
              保存
            </el-button>
            <el-button type="danger"
                       @click="cancel"
                       size="small">
              取消
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
import { AccessService } from '@/api'

export default {
  props: ['medical', 'addMedical'],
  data() {
    return {
      editState: false,
      medicalInfo: {
        'type': '',
        'name': '',
        'code': '',
        'level': '',
        'cooperation_mode': '1',
        'expire_time': '2018-08-23T10:21:45.943Z',
        'sign': 'string',
        'lng': 'string',
        'lat': 'string',
        'created_at': 0,
        'updated_at': 0,
        'created_by': '',
        'updated_by': '',
        'obsoleted': false,
        'sort_value': 1
      },
      obsoletedOptions: [
        {
          title: '作废',
          value: true
        },
        {
          title: '未作废',
          value: false
        }
      ],
      institutionLevel: [
        {
          title: '区域审方中心',
          value: 1
        },
        {
          title: '丙',
          value: 11
        },
        {
          title: '乙',
          value: 12
        },
        {
          title: '甲',
          value: 13
        },
        {
          title: '二丙',
          value: 21
        },
        {
          title: '二乙',
          value: 22
        },
        {
          title: '二甲',
          value: 23
        },
        {
          title: '三丙',
          value: 31
        },
        {
          title: '三乙',
          value: 32
        },
        {
          title: '三甲',
          value: 33
        }
      ],
      institutionStar: [
        {
          title: '一星',
          value: 1
        },
        {
          title: '两星',
          value: 2
        },
        {
          title: '三星',
          value: 3
        },
        {
          title: '四星',
          value: 4
        },

        {
          title: '五星',
          value: 5
        }
      ],
      institutionType: [
        {
          title: '区域审方中心',
          value: 1
        },
        {
          title: '公立医院',
          value: 11
        },
        {
          title: '私立医院',
          value: 12
        },
        {
          title: '互联网医院',
          value: 13
        },
        {
          title: '药房',
          value: 21
        }
      ]
    }
  },
  mounted() {
    if (!this.addMedical) {
      this.medicalInfo = this.medical
    }
  },
  methods: {
    save() {
      if (this.addMedical) {
        AccessService.createInstitution(this.medicalInfo).then(data => {
          if (data.status === 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.$emit('popMsg', 'create')
          }
        })
      } else {
        this.editState = false
        AccessService.updateInstitution(this.medicalInfo).then(data => {
          if (data.status === 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        })
      }
    },
    deleteMedical() {
      this.$confirm(`确认删除${this.medicalInfo.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        AccessService.deleteInstitution(this.medicalInfo.id).then(data => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('popMsg', 'delete')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    cancel() {
      if (this.addMedical) {
        this.$emit('popMsg')
      } else {
        this.editState = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.medical-card {
  .card {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
