<template>
  <div class="refund">
    <h1>退费列表</h1>
    <hr>
    <el-row>
      <el-card>
        <div class="clearfix"
             slot="header">
          <el-col :span="24">
            <el-form :inline="true"
                     ref="form"
                     size="small"
                     :model="conditionData"
                     class="demo-form-inline">
              <el-form-item label="退款ID">
                <el-input v-model="conditionData.refundId"></el-input>
              </el-form-item>
              <el-form-item lable="用户手机号">
                <el-input v-model="conditionData.telNum"></el-input>
              </el-form-item>
              <el-form-item>
                <el-radio v-model="conditionData.end"
                          label="student">学生端</el-radio>
                <el-radio v-model="conditionData.end"
                          label="parent">家长端</el-radio>
              </el-form-item>

              <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
        <div class="clearfix">
          <el-col :span="24">
            <el-table :data="list"
                      stripe
                      border
                      style="width: 100%">
              <el-table-column prop="refundId"
                               align="center"
                               label="退款ID">
              </el-table-column>
              <el-table-column prop="orderId"
                               align="center"
                               label="订单ID">
              </el-table-column>
              <el-table-column prop="tsCreateBill"
                               align="center"
                               label="订单创建时间">
              </el-table-column>
              <el-table-column prop="productName"
                               align="center"
                               label="商品名">
              </el-table-column>
              <el-table-column prop="originPrice"
                               align="center"
                               label="原始价格">
              </el-table-column>
              <el-table-column prop="refund"
                               align="center"
                               label="退款数额">
              </el-table-column>
              <el-table-column prop="remarks"
                               align="center"
                               label="附加说明">
              </el-table-column>
              <el-table-column prop="operator"
                               align="center"
                               label="操作人">
              </el-table-column>
              <el-table-column prop="channel"
                               align="center"
                               label="支付渠道">
              </el-table-column>
              <el-table-column prop="updatedAt"
                               align="center"
                               label="更新时间">
              </el-table-column>
              <el-table-column prop="channel"
                               align="center"
                               label="操作">
              </el-table-column>
              <el-table-column prop="channel"
                               align="center"
                               label="审核">
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
        refundId: '',
        telNum: '',
        end: ''
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 5
      },
      list: [
        {
          'refund': '20.00',
          'status': '1',
          'remarks': '测试',
          'operator': 'admin',
          'refundId': '2309',
          'orderId': '3856435',
          'originPrice': '40.00',
          'productId': '41',
          'productName': '30天高级兵器库-30天',
          'createdAt': '2018-06-19 18:31:02',
          'updatedAt': '2018-08-06 19:41:39',
          'tsCreateBill': '2017-11-30 11:37:57',
          'channel': 'wx_wap',
          'ping_status': '',
          'ping_failure_msg': ''
        },
        {
          'refund': '150.00',
          'status': '0',
          'remarks': '测试',
          'operator': 'admin',
          'refundId': '2308',
          'orderId': '3856437',
          'originPrice': '150.00',
          'productId': '990',
          'productName': '30张-30张学习卡',
          'createdAt': '2018-06-19 18:27:21',
          'updatedAt': '2018-06-19 18:27:21',
          'tsCreateBill': '2017-11-30 11:40:20',
          'channel': 'wx_wap',
          'ping_status': '',
          'ping_failure_msg': ''
        },
        {
          'refund': '1.00',
          'status': '1',
          'remarks': 'test',
          'operator': 'james',
          'refundId': '2252',
          'orderId': '3800001',
          'originPrice': '1800.00',
          'productId': '10',
          'productName': '‘’',
          'createdAt': '2018-06-11 18:57:50',
          'updatedAt': '2018-06-14 16:13:13',
          'tsCreateBill': '2017-06-12 18:36:10',
          'channel': 'wx',
          'ping_status': '',
          'ping_failure_msg': ''
        },
        {
          'refund': '40.00',
          'status': '0',
          'remarks': '测试',
          'operator': 'liusl',
          'refundId': '2307',
          'orderId': '3856434',
          'originPrice': '40.00',
          'productId': '41',
          'productName': '30天高级兵器库-30天',
          'createdAt': '2018-06-05 19:24:14',
          'updatedAt': '2018-06-19 18:10:09',
          'tsCreateBill': '2017-11-30 11:33:13',
          'channel': 'wx_wap',
          'ping_status': '',
          'ping_failure_msg': ''
        },
        {
          'refund': '6.00',
          'status': '0',
          'remarks': 'ceshi',
          'operator': 'admin',
          'refundId': '2306',
          'orderId': '3856436',
          'originPrice': '40.00',
          'productId': '989',
          'productName': '尝鲜大礼包-尝鲜大礼包学习卡',
          'createdAt': '2018-05-21 10:44:01',
          'updatedAt': '2018-05-21 10:44:01',
          'tsCreateBill': '2017-11-30 11:39:05',
          'channel': 'wx_wap',
          'ping_status': '',
          'ping_failure_msg': ''
        },
        {
          'refund': '1.00',
          'status': '0',
          'remarks': '测试',
          'operator': 'admin',
          'refundId': '2300',
          'orderId': '3856438',
          'originPrice': '30.00',
          'productId': '991',
          'productName': '70张-70张学习卡',
          'createdAt': '2018-04-28 18:23:31',
          'updatedAt': '2018-04-28 18:23:31',
          'tsCreateBill': '2017-11-30 11:41:26',
          'channel': 'wx_wap',
          'ping_status': '',
          'ping_failure_msg': ''
        },
        {
          'refund': '45.00',
          'status': '1',
          'remarks': '测试liu2',
          'operator': 'admin',
          'refundId': '2293',
          'orderId': '3800036',
          'originPrice': '4500.00',
          'productId': '36',
          'productName': '‘’',
          'createdAt': '2018-04-16 18:52:47',
          'updatedAt': '2018-04-18 11:41:07',
          'tsCreateBill': '2017-06-12 18:37:18',
          'channel': 'wx',
          'ping_status': '',
          'ping_failure_msg': ''
        },
        {
          'refund': '45.00',
          'status': '1',
          'remarks': '测试liu2',
          'operator': 'admin',
          'refundId': '2292',
          'orderId': '3800036',
          'originPrice': '4500.00',
          'productId': '36',
          'productName': '‘’',
          'createdAt': '2018-04-16 18:51:24',
          'updatedAt': '2018-04-25 11:28:16',
          'tsCreateBill': '2017-06-12 18:37:18',
          'channel': 'wx',
          'ping_status': '',
          'ping_failure_msg': ''
        },
        {
          'refund': '45.00',
          'status': '0',
          'remarks': '测试liu',
          'operator': 'liu',
          'refundId': '2291',
          'orderId': '3800036',
          'originPrice': '4500.00',
          'productId': '36',
          'productName': '‘’',
          'createdAt': '2018-04-16 18:48:05',
          'updatedAt': '2018-04-16 18:48:05',
          'tsCreateBill': '2017-06-12 18:37:18',
          'channel': 'wx',
          'ping_status': '',
          'ping_failure_msg': ''
        },
        {
          'refund': '1.00',
          'status': '1',
          'remarks': 'test',
          'operator': 'admin',
          'refundId': '2289',
          'orderId': '3800003',
          'originPrice': '1800.00',
          'productId': '10',
          'productName': 'eeee',
          'createdAt': '2018-03-31 16:51:42',
          'updatedAt': '2018-04-25 17:47:20',
          'tsCreateBill': '2017-06-12 18:36:11',
          'channel': 'alipay_wap',
          'ping_status': '',
          'ping_failure_msg': ''
        }
      ]
    }
  },
  mounted() {
    // this.total = this.tableData.length
    // this.getList()
  },
  methods: {
    getList() {
      this.list = this.tableData.slice((this.listQuery.page - 1) * this.listQuery.limit, (this.listQuery.page - 1) * this.listQuery.limit + this.listQuery.limit)
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
.refund {
  padding: 20px 20px;
  /deep/ .el-form-item {
    margin-bottom: 0;
  }
}
</style>
