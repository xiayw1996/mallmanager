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
        <el-input
          class="inputSearch"
          placeholder="请输入内容"
          v-model="query"
          clearable
          @clear="loadUserList()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchUser()"
          />
        </el-input>
      </el-col>
      <el-col>
        <el-button type="primary" @click="showAddDia()">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userList" height="350px" style="width: 100%">
      <el-table-column label="#" width="60" type="index" />
      <el-table-column prop="mgName" label="姓名" width="100" />
      <el-table-column prop="mgEmail" label="邮箱" />
      <el-table-column prop="mgMobile" label="电话" />
      <!-- slot-scope的值是从userList中的每一个row里取的 -->
      <!-- 
        <el-table-column label="创建时间">
        <template slot-scope="userList">
          {{ userList.row.mgTime | fmtdate }}
        </template>
      </el-table-column>
       -->
      <el-table-column prop="mgTime1" label="创建时间" />
      <el-table-column label="用户状态">
        <template slot-scope="userList">
          <el-switch
            v-model="userList.row.mgState"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeState(userList.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
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

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="start"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="length"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.mgName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.mgPwd" autocomplete="off" show-password />
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form.mgEmail" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form.mgMobile" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.mgName" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form.mgEmail" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form.mgMobile" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="120px">
          {{ this.currUserName }}
        </el-form-item>
        <el-form-item label="角色" label-width="120px">
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1" />
            <el-option
              :label="item.roleName"
              :value="item.roleId"
              v-for="(item, i) in roles"
              :key="i"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      start: 1,
      length: 5,
      userList: [],
      total: 0,
      addFormVisible: false,
      editFormVisible: false,
      roleFormVisible: false,
      form: {
        mgId: -1,
        mgName: "",
        mgPwd: "",
        mgEmail: "",
        mgMobile: "",
      },
      currRoleId: -1,
      currUserName: "",
      roles: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取用户列表数据
    async getUserList() {
      //计算每页分页
      var start = this.length * (this.start - 1);

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
      // console.log(`每页 ${val} 条`);
      //将当前data中的数据当前页数改变
      this.length = val;
      //将当前页改为第一页
      this.start = 1;
      //重新获取数据
      this.getUserList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      //修改当前页
      this.start = val;
      //重新获取数据
      this.getUserList();
    },
    // 搜索功能
    searchUser() {
      this.getUserList();
    },
    //清空搜索框，重新加载数据
    loadUserList() {
      this.getUserList();
    },
    // 显示添加用户对话框
    showAddDia() {
      // 清空from表单
      this.form = {};
      // 显示对话框
      this.addFormVisible = true;
    },
    //添加用户
    async addUser() {
      // 调用添加接口
      const res = await this.$http.post("/sm/insert", this.form);
      const { code, msg } = res.data;
      if (code === 0) {
        // 将对话框隐藏
        this.addFormVisible = false;
        this.$message.success(msg);
        //重新更新数据
        this.getUserList();
      } else {
        this.$message.error(msg);
      }
    },
    //显示删除对话框
    showDelDia(mgId) {
      this.$confirm("删除该条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.post("/sm/delete?mgId=" + mgId);
        if (res.data.code === 0) {
          this.$message.success("删除成功!");
          //设置当前页是第一页
          this.start = 1;
          //重新更新数据
          this.getUserList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 显示编辑对话框
    showEditDia(user) {
      this.form = user;
      this.editFormVisible = true;
    },
    //修改用户
    async editUser() {
      // 初始化赋值参数
      let param = {};
      param.mgId = this.form.mgId;
      param.mgName = this.form.mgName;
      param.mgEmail = this.form.mgEmail;
      param.mgMobile = this.form.mgMobile;
      // 调用修改接口
      const res = await this.$http.post("/sm/update", param);
      const { code, msg } = res.data;
      if (code === 0) {
        // 将对话框隐藏
        this.editFormVisible = false;
        this.$message.success(msg);
        //重新更新数据
        this.getUserList();
      } else {
        this.$message.error(msg);
      }
    },
    // 改变用户状态
    async changeState(user) {
      let param = {};
      param.mgId = user.mgId;
      param.mgState = user.mgState;
      const res = await this.$http.post("/sm/update", param);
      if (res.data.code === 0) {
        this.$message.success(res.data.msg);
      } else {
        this.$message.error(res.data.msg);
      }
      // 调用数据刷新
      this.getUserList();
    },
    // 显示角色对话框
    async showRoleDia(user) {
      this.roleFormVisible = true;
      this.currRoleId = user.roleId;
      this.currUserName = user.mgName;
      this.form = user;

      const res = await this.$http.get("/sr/selectAll");
      this.roles = res.data.data;
    },
    // 修改角色
    async updateRole() {
      // 赋值请求字段
      let param = {};
      param.mgId = this.form.mgId;
      param.roleId = this.currRoleId;
      // 调用修改角色接口
      const res = await this.$http.post("/sm/update", param);
      if (res.data.code === 0) {
        this.$message.success(res.data.msg);
        // 隐藏对话框
        this.roleFormVisible = false;
      } else {
        this.$message.error(res.data.msg);
      }
      // 调用数据刷新
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
.searchRow .el-col {
  width: 320px;
}
</style>