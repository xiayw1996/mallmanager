<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="权限管理" level2="角色列表" />

    <!-- 添加按钮 -->
    <el-row class="addRoleBtn">
      <el-col>
        <el-button type="primary">添加角色</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="roleList" style="width: 100%">
      <el-table-column label="#" width="150px" type="index" />
      <el-table-column prop="roleName" label="角色名称" width="200px" />
      <el-table-column prop="roleDesc" label="角色描述" width="200px" />
      <el-table-column prop="address" label="操作">
        <template slot-scope="userList">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditDia(userList.row)"
          />
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDelDia(userList.row.mgId)"
          />
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showRoleDia(userList.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      roleList: [],
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const res = await this.$http.get("/sr/selectAll");
      this.roleList = res.data.data;
    },
  },
};
</script>
<style>
.addRoleBtn {
  margin-top: 20px;
}
</style>