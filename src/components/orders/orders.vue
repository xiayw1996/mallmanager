<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="订单管理" level2="订单列表" />

    <!-- 订单表格 -->
    <el-table :data="orderList" border height="445px" class="tbClass">
      <el-table-column label="#" width="100" type="index" />
      <el-table-column prop="orderNumber" label="订单编号" />
      <el-table-column prop="orderPrice" label="订单总金额" />
      <el-table-column prop="isSend" label="是否发货" />
      <el-table-column prop="orderFapiaoTitle" label="发票抬头" />
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      orderList: [],
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      const res = await this.$http.get("/so/selectAll");
      this.orderList = res.data.data;
    },
  },
};
</script>

<style>
.tbClass {
  width: 100%;
  margin-top: 20px;
}
</style>