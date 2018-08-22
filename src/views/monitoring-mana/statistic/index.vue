<template>
  <div class="statictis">
    <el-card>
      <el-row justify="space-between"
              type="flex">
        <el-col :span="6">
          <el-card class='selecteitem'
                   :class="{selected:selectedChart==='PharmacistPrescriptionAudition'}"
                   @click.native="selectedChart='PharmacistPrescriptionAudition'">
            表1
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class='selecteitem'
                   :class="{selected:selectedChart==='PrescriptionAudition'}"
                   @click.native="selectedChart='PrescriptionAudition'">
            表2
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class='selecteitem'
                   :class="{selected:selectedChart==='PrescriptionMedicine'}"
                   @click.native="selectedChart='PrescriptionMedicine'">
            表2
          </el-card>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="24">
          <keep-alive>
            <component :is="selectedChart"></component>
          </keep-alive>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import PharmacistPrescriptionAudition from './PharmacistPrescriptionAudition.js'
import PrescriptionAudition from './PrescriptionAudition.js'
import PrescriptionMedicine from './PrescriptionMedicine.js'
export default {
  components: { PharmacistPrescriptionAudition, PrescriptionAudition, PrescriptionMedicine },
  data() {
    return {
      selectedChart: 'PharmacistPrescriptionAudition'
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
$bkg: red;
$hoverColor: yellow;
.selected {
  background-color: $bkg;
}
.selecteitem {
  cursor: pointer;
  &:hover {
    background-color: $hoverColor;
  }
}
</style>
