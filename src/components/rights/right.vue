<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="权限管理" level2="权限列表" />

    <!-- 权限表格 -->
    <el-table :data="rightList" border height="445px" class="tbClass">
      <el-table-column label="#" width="100" type="index" />
      <el-table-column prop="psName" label="权限名称" />
      <el-table-column prop="psApiPath" label="路径" />
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.psLevel === '0'">一级</span>
          <span v-if="scope.row.psLevel === '1'">二级</span>
          <span v-if="scope.row.psLevel === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rightList: [],
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    async getRightList() {
      const res = await this.$http.get("/sp/selectAll?type=0");
      this.rightList = res.data.data;
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