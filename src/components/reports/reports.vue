<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="数据统计" level2="数据报表" />

    <!-- 数据报表 -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      report: [],
    };
  },
  created() {
    this.getReport();
  },
  methods: {
    async getReport() {
      const res = await this.$http.get("/so/selectAll");
      this.report = res.data.data;
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