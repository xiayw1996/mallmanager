<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="logo" src="@/assets/logo.png" alt="无法显示图片" />
          </div>
        </el-col>
        <el-col :span="17" class="middle">
          <h2>后端管理平台</h2>
        </el-col>
        <el-col :span="2">
          <div class="user">
            <i class="el-icon-user" />
            <span> {{ userName }}</span>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <a class="loginout" @click.prevent="handleSignout()" href="#"
              >退出</a
            >
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          :router="true"
          :unique-opened="true"
          background-color="#aacef8"
          text-color="#fff"
          active-text-color="#00ffff"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-user-solid"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="role">
              <i class="el-icon-s-check"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-key"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="goods">
              <i class="el-icon-s-goods"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="categories">
              <i class="el-icon-copy-document"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="goodsCats">
              <i class="el-icon-box"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="orders">
              <i class="el-icon-s-order"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="reports">
              <i class="el-icon-s-data"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>图片管理</span>
            </template>
            <el-menu-item index="imgManager">
              <i class="el-icon-picture"></i>
              <span>图表列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      userName: "未登录",
    };
  },
  created() {
    //获取token
    const token = localStorage.getItem("token");
    this.userName = localStorage.getItem("userName");
    //如果有就继续，没有就返回登录页
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    //退出方法
    handleSignout() {
      //清除token
      localStorage.clear();
      //跳转到登录页
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #6bbeee;
}
.aside {
  background-color: #a8c4e4;
}
.main {
  background-color: #d3dae0;
}
/* 头部样式 */
.middle {
  line-height: 20px;
  text-align: center;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
.logo {
  margin-top: 4px;
  width: 160px;
  height: 50px;
}
.user {
  margin-top: 20px;
}
</style>