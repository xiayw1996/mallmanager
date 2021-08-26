<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="数据统计" level2="数据报表" />

    <!-- 数据报表 -->
    <div id="myChart" :style="{ width: '600px', height: '300px' }" />

    <div id="myChart2" :style="{ width: '600px', height: '300px' }" />
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      report: [],
    };
  },
  mounted() {
    this.getReport();
  },
  methods: {
    getReport() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: { text: "柱形图" },
        tooltip: {},
        xAxis: {
          data: ["短袖", "羊毛衫", "羽绒服", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: [5, 10, 20, 30, 40, 50],
          },
        ],
      });

      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      myChart2.setOption({
        title: { text: "折线图" },
        tooltip: {},
        xAxis: {
          data: ["短袖", "羊毛衫", "羽绒服", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            type: "line",
            data: [5, 10, 20, 30, 40, 50],
          },
        ],
      });
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