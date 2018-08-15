<template>
  <div class="refund">
    <h1>测试列表</h1>
    <hr>
    <el-row>
      <el-card>
        <div class="clearfix"
             slot="header">
          添加配置
        </div>
        <div class="clearfix">
          <el-col :span="24">
            <el-form size="small"
                     ref="form"
                     :model="conditionData">
              <el-form-item label="选择城市">
                <el-select v-model="conditionData.city"
                           placeholder="选择城市">
                  <el-option v-for="item in Object.keys(conditionData.cities)"
                             :key="item"
                             :label="conditionData.cities[item]"
                             :value="item">
                  </el-option>
                </el-select>
                <el-button type="success">添加</el-button>
              </el-form-item>
              <el-form-item label="选择产品">
                <el-select v-model="conditionData.product"
                           placeholder="选择产品">
                  <el-option v-for="item in Object.keys(conditionData.productsList)"
                             :key="item"
                             :label="conditionData.productsList[item]"
                             :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conditionData: {
        city: '',
        product: '',
        cities: {
          '2': '北京',
          '3': '安徽',
          '4': '福建',
          '5': '甘肃',
          '6': '广东',
          '7': '广西',
          '8': '贵州',
          '9': '海南',
          '10': '河北',
          '11': '河南',
          '12': '黑龙江',
          '13': '湖北',
          '14': '湖南',
          '15': '吉林',
          '16': '江苏',
          '17': '江西',
          '18': '辽宁',
          '19': '内蒙古',
          '20': '宁夏',
          '21': '青海',
          '22': '山东',
          '23': '山西',
          '24': '陕西',
          '25': '上海',
          '26': '四川',
          '27': '天津',
          '28': '西藏',
          '29': '新疆',
          '30': '云南',
          '31': '浙江',
          '32': '重庆',
          '3788': '测试'
        },
        productsList: {
          '980': '60张学习卡（内含赠卡10张）',
          '981': '85张学习卡（内含赠卡16张）',
          '990': '30张学习卡',
          '991': '70张学习卡（内含赠卡10张）',
          '992': '110张学习卡（内含赠卡20张）',
          '993': '200张学习卡（内含赠卡50张）',
          '994': '450张学习卡（内含赠卡150张）',
          '1123': '测试',
          '1124': '测试',
          '1142': '测试添加产品'
        }
      }
    }
  },
  mounted() {

  },
  methods: {

  }
}

</script>

<style scoped lang="scss">
.refund {
  padding: 20px 20px;
}
</style>
