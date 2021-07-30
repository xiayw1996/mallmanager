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
      <el-table-column type="expand" width="150px">
        <template slot-scope="scope">
          <el-row v-for="(item1, i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                type="danger"
                closable
                @close="delRight(scope.row, item1.id)"
              >
                {{ item1.authName }}
              </el-tag>
              <i class="el-icon-arrow-right" />
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, j) in item1.children" :key="j">
                <el-col :span="4">
                  <el-tag
                    type="warning"
                    closable
                    @close="delRight(scope.row, item2.id)"
                  >
                    {{ item2.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right" />
                </el-col>
                <el-col :span="20">
                  <el-tag
                    v-for="(item3, k) in item2.children"
                    :key="k"
                    type="success"
                    closable
                    @close="delRight(scope.row, item3.id)"
                  >
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <!-- 未分配权限提示 -->
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column label="#" width="150px" type="index" />
      <el-table-column prop="roleName" label="角色名称" width="200px" />
      <el-table-column prop="roleDesc" label="角色描述" width="200px" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditDia(scope.row)"
          />
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDelDia(scope.row.mgId)"
          />
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showRightDia(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 显示设置权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="editRightFormVisible">
      <el-tree
        ref="tree"
        :data="treeList"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="defaultProps"
        :default-checked-keys="arrCheck"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRightFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      roleList: [],
      editRightFormVisible: false,
      treeList: [],
      defaultProps: {
        label: "authName",
        children: "children",
      },
      arrExpand: [],
      arrCheck: [],
      curRoleId: -1,
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    //获取角色列表
    async getRoleList() {
      const res = await this.$http.get("/sr/selectRoleRight");
      this.roleList = res.data.data;
    },
    //删除角色下的权限
    async delRight(role, RightId) {
      const res = await this.$http.post(
        "/sr/deleteRoleRight?roleId=" + role.id + "&psId=" + RightId
      );
      //将更新完成返回的这个角色下的所有权限，给到角色下拉中，这样就会自动渲染了
      role.children = res.data.data;
    },
    //显示分配权限对话框
    async showRightDia(role) {
      //给当前角色id赋值
      this.curRoleId = role.id;
      //在显示对话框之前，先拿到数据
      const res = await this.$http.get("/sp/selectAll?type=1");
      //然后将数据给到这个树形结构
      this.treeList = res.data.data;

      var arrTemp2 = [];
      //循环遍历这个role最外层这个数组
      role.children.forEach((item1) => {
        //循环变里第一层下面的子数组
        item1.children.forEach((item2) => {
          item2.children.forEach((item3) => {
            //将最三层的id全部存到arrTemp1中
            arrTemp2.push(item3.id);
          });
        });
      });
      //将这个添加好所有id的数组，赋值给绑定的那个数组
      this.arrCheck = arrTemp2;
      this.editRightFormVisible = true;
    },
    //设置角色权限
    async setRoleRight() {
      //获取树形结构全选和半选id的数组
      //在elment中有getCheckedKeys可以获取所有全选的勾的key值
      let arr1 = this.$refs.tree.getCheckedKeys();
      //getHalfCheckedKeys可以获取所有半选的key值
      let arr2 = this.$refs.tree.getHalfCheckedKeys();
      //将两个数组合并,...运算符是es6中的展开运输符，效果就是
      //假如arr1 = [1,2,3] 用...写法后，arr2 = [...arr1,4] = [1,2,3,4]
      let arr = [...arr1, ...arr2];
      const res = await this.$http.post(
        "/sr/updateRoleRight?roleId=" +
          this.curRoleId +
          "&psIds=" +
          arr.join(",")
      );
      this.getRoleList();
      this.editRightFormVisible = false;
    },
  },
};
</script>
<style>
.addRoleBtn {
  margin-top: 20px;
}
</style>