<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="商品管理" level2="分类参数" />

    <!-- 分类表格 -->
    <el-table :data="categorieList" border height="445px" class="tbClass">
      <el-table-column label="#" width="100" type="index" />
      <el-table-column prop="catName" label="分类名称" />
      <el-table-column prop="catLevel" label="分类层级" />
      <el-table-column prop="catDeleted" label="是否删除" />
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      categorieList: [],
    };
  },
  created() {
    this.getCategorieList();
  },
  methods: {
    async getCategorieList() {
      const res = await this.$http.get("/sc/selectAll");
      this.categorieList = res.data.data;
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