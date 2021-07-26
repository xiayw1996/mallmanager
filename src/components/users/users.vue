<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input class="inputSearch" placeholder="请输入内容" v-model="query">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary">添加用户</el-button>
      </el-col>
      <el-col>
        <el-table :data="userList" style="width: 100%">
          <el-table-column label="#" width="60" type="index" />
          <el-table-column prop="mgName" label="姓名" width="100" />
          <el-table-column prop="mgEmail" label="邮箱" />
          <el-table-column prop="mgMobile" label="电话" />
          <!-- slot-scope的值是从userList中的每一个row里取的 -->
          <el-table-column label="创建时间">
            <template slot-scope="userList">
              {{ userList.row.mgTime | fmtdate }}
            </template>
          </el-table-column>
          <el-table-column label="用户状态">
            <template slot-scope="userList">
              <el-switch
                v-model="userList.row.mgState"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template>
              <el-button
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
              />
              <el-button
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
              />
              <el-button
                size="mini"
                plain
                type="success"
                icon="el-icon-check"
                circle
              />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="start"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="length"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      start: 1,
      length: 2,
      userList: [],
      total: 0,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取用户列表数据
    async getUserList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      //计算每页分页
      var start = this.start - 1;
      start = this.length * start;

      const res = await this.$http.get(
        "/sm/users?query=" +
          this.query +
          "&start=" +
          start +
          "&length=" +
          this.length
      );
      const { code, msg, pageData, recordsTotal } = res.data;
      if (code === 0) {
        this.userList = pageData;
        this.total = recordsTotal;
      }
    },
    //分页事件代码
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //将当前data中的数据当前页数改变
      this.length = val;
      //将当前页改为第一页
      this.start = 1;
      //重新获取数据
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //修改当前页
      this.start = val;
      //重新获取数据
      this.getUserList();
    },
  },
};
</script>

<style scoped>
.box-card {
  height: 100%;
}
.inputSearch {
  width: 300px;
}
.searchRow {
  margin-top: 20px;
}
</style>