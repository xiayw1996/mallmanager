<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="商品管理" level2="商品列表" />

    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          class="inputSearch"
          placeholder="请输入内容"
          v-model="query"
          clearable
          @clear="loadGoodList()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchGood()"
          />
        </el-input>
      </el-col>
    </el-row>

    <!-- 商品表格 -->
    <el-table :data="goodList" border height="430px" class="tbClass">
      <el-table-column label="#" width="100" type="index" />
      <el-table-column prop="goodsName" label="商品名称" />
      <el-table-column prop="goodsPrice" label="商品价格" />
      <el-table-column prop="goodsNumber" label="商品数量" />
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="start"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="length"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      start: 1,
      length: 5,
      total: 0,
      goodList: [],
    };
  },
  created() {
    this.getGoodList();
  },
  methods: {
    async getGoodList() {
      //计算每页分页
      var start = this.length * (this.start - 1);

      const res = await this.$http.get(
        "/sg/goods?query=" +
          this.query +
          "&start=" +
          start +
          "&length=" +
          this.length
      );

      const { code, msg, pageData, recordsTotal } = res.data;
      if (code === 0) {
        this.goodList = pageData;
        this.total = recordsTotal;
      }
    },
    //分页事件代码
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      //将当前data中的数据当前页数改变
      this.length = val;
      //将当前页改为第一页
      this.start = 1;
      //重新获取数据
      this.getGoodList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      //修改当前页
      this.start = val;
      //重新获取数据
      this.getGoodList();
    },
    // 搜索功能
    searchGood() {
      this.getGoodList();
    },
    //清空搜索框，重新加载数据
    loadGoodList() {
      this.getGoodList();
    },
  },
};
</script>

<style>
.tbClass {
  width: 100%;
  margin-top: 20px;
}
.inputSearch {
  width: 300px;
}
.searchRow {
  margin-top: 20px;
}
.searchRow .el-col {
  width: 320px;
}
</style>