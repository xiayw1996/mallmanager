<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="商品管理" level2="商品分类" />

    <!-- 分类表格 -->
    <el-table :data="catList" border height="445px" class="tbClass">
      <el-table-column label="#" width="100" type="index" />
      <el-table-column prop="catName" label="分类名称" />
      <el-table-column prop="isShow" label="是否显示" />
      <el-table-column prop="catSort" label="分类排序" />
      <el-table-column prop="createTime" label="创建时间" />
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      catList: [],
    };
  },
  created() {
    this.getcatList();
  },
  methods: {
    async getcatList() {
      const res = await this.$http.get("/sgc/selectAll");
      this.catList = res.data.data;
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