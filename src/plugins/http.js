//插件模块

import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {

  axios.defaults.baseURL = 'http://localhost:8080'

  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.url !== '/login') {
      const AUTH_TOKEN = localStorage.getItem("token");
      config.headers["Authorization"] = AUTH_TOKEN;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    var data = response.data;
    if (data !== null && data.code === 999) {
      alert("token超时,请重新登录");
      //清除token
      localStorage.clear();
      //重定向到登录页面
      window.location.replace("/login");
    }
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  // 添加实例方法
  Vue.prototype.$http = axios;
}

export default MyHttpServer