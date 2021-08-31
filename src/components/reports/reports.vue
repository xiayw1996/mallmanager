<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="数据统计" level2="数据报表" />

    <!-- 数据报表 -->
    <el-row class="chart">
      <el-col class="chart1">
        <el-date-picker
          v-model="chartDate1"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholde="开始日期"
          end-placeholde="结束日期"
        />
        <el-button type="primary" @click="search1()">查询</el-button>
        <div id="myChart1" :style="{ width: '500px', height: '300px' }" />
      </el-col>
      <el-col class="chart2">
        <el-date-picker
          v-model="chartDate2"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholde="开始日期"
          end-placeholde="结束日期"
        />
        <el-button type="primary" @click="search2()">查询</el-button>
        <div id="myChart2" :style="{ width: '500px', height: '300px' }" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      chartDate1: "",
      chartDate2: "",
    };
  },
  mounted() {
    this.getReport();
  },
  methods: {
    getReport() {
      this.chart("myChart1", "bar", this.chartDate1);
      this.chart("myChart2", "line", this.chartDate2);
    },
    search1() {
      //获取图表id是myChart1,类型是柱状图,时间区间是选择好的
      this.chart("myChart1", "bar", this.chartDate1);
    },
    search2() {
      this.chart("myChart2", "line", this.chartDate2);
    },
    //根据图表绑定的id，图表的类型，时间区间，来获取图表
    async chart(chartId, chartType, chartDate) {
      //初始化参数
      let startDate = "";
      let endDate = "";
      let xAxis = [];
      let series = [];
      //如果选中的时间区间不是空
      if (chartDate != null && chartDate != "") {
        //就给时间赋值
        startDate = chartDate[0];
        endDate = chartDate[1];
      }
      //调用图表数据返回接口
      const res = await this.$http.get(
        "/sr1/select?startDate=" + startDate + "&endDate=" + endDate
      );
      //将结果赋值
      const { code, data } = res.data;
      //如果接口正确，就获取数据
      if (code === 0) {
        xAxis = data.xAxis;
        series = data.series;
      }
      //根据传进来的图表id，绑定这个图表
      let myChart = this.$echarts.init(document.getElementById(chartId));
      //给图表赋值
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: xAxis,
        },
        yAxis: {},
        series: [
          {
            type: chartType,
            data: series,
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
.chart {
  margin-top: 20px;
}
.chart .chart1 {
  width: 500px;
}
.chart .chart2 {
  width: 500px;
}
</style>