<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="formLabelAlign.password"
          show-password
          @keyup.enter.native="handleLogin()"
        ></el-input>
      </el-form-item>
      <el-button
        class="login-btn"
        @click.prevent="handleLogin()"
        type="primary"
        round
        >登录</el-button
      >
    </el-form>
    <div class="footer">
      <a href="https://beian.miit.gov.cn/">鄂ICP备2021006086号-1</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      formLabelAlign: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.$http.post("login", this.formLabelAlign);
      const { data, msg, code } = res.data;
      if (code === 0) {
        //保存token
        localStorage.setItem("token", data.token);
        //保存用户id
        localStorage.setItem("userId", data.id);
        //保存用户名
        localStorage.setItem("userName", data.username);
        //返回登录的成功消息
        this.$message.success(msg);
        //跳转到home页面
        this.$router.push({ name: "home" });
      } else {
        //返回登录失败的消息
        this.$message.error(msg);
      }
    },
  },
};
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324153;
  /* 弹性盒布局 */

  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  position: fixed;
  height: 350px;
}
.login-wrap .login-btn {
  width: 100%;
}
.footer {
  height: 25px;
  width: 184px;
  position: fixed;
  margin: auto;
  left: 0px;
  right: 0px;
  bottom: 10px;
}
</style>
