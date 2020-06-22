import axios from 'axios';
import qs from 'qs'
// import cookies from './cookies'
// import router from '@/router';
// 创建一个 axios 实例
axios.defaults.transformRequest = [function (data) {
  return qs.stringify(data)
}]
const service = axios.create({
  // apiBaseURL:'http://cuncun.admin.iisu.cn'
  // baseURL: env === 'development' ? '/' : '/',
  timeout: 2000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    config.headers['X-TENANT-ID'] = 'frt:qfii_2020'
    const token = window.localStorage.getItem('token')
    // const token = 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50X2lkIjoiNWU4ZGNkYTIwYzE2M2I0MjRjZmNlMjBjIiwibG9naW5fdHlwZSI6Im1vYmlsZSIsImxvZ2luX3Byb2ZpbGUiOnsidHlwZSI6InVzZXIifSwibG9naW5fYWNjb3VudCI6IjEzNjQ2NDQ2NTk0IiwiZXhwIjoxNTkwMjA1ODM4fQ.Uaa_TCLaaW_FFFua5DSU7GN_OrMAMu8rmOPxGXGYN7JkyMnkkbpJFyjpAsOoAbzz8DX8_TillgKX5jlfQ2U0NabBsfbqdlIGdHHFHzicZuQe-wwoYczrxFJnWG1eXE9j9KGqYkYjU5j8-go9aO5aH2AaAo7W14r0F9m3rAEwAlqTJe9Ni770-8mzIMmGdON7Ikz1bio1EzLuUuN3SzNrJVdJNGIbG3RqFrXy90bncD4IlefcC9PXVgMHTy5xRs_WtYTpqceEnusDqYQcnG7kFh5LszVStc-T4D59toGYnK4U7uVDpEc65CLBzPIUnBijwAhARetQ1QI6jKaBeq-uRQ'
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    if (token) {
      config.headers.Authorization = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    // config.headers['X-Token'] = token;
    return config;
  },
  error => {
    // 发送失败
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { code } = '0';
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios;
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
      case 0:
        // [ 示例 ] code === 0 代表没有错误
        return dataAxios.data;
      case 'xxx':
        // [ 示例 ] 其它和后台约定的 code
        // errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`);
        break;
      default:
        // 不是正确的 code
        // errorCreate(`${dataAxios.msg}: ${response.config.url}`);
        break;
      }
    }
  },
  error => {
    if (error && error.response) {
      console.log(error);
      if (error.response.status === 401) {
        // // 跳转路由
        // router.push({
        //   name: 'login'
        // });
        var loginType = window.localStorage.getItem('loginType')
        window.localStorage.setItem('loginType', false)
        window.localStorage.setItem('token', null)
        if (loginType === true || loginType === 'true') {
          window.location.reload()
        }
      }
      switch (error.response.status) {
      case 400: error.message = '请求错误'; break;
      case 401: error.message = '未授权，请登录'; break;
      case 403: error.message = '拒绝访问'; break;
      case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
      case 408: error.message = '请求超时'; break;
      case 500: error.message = '服务器内部错误'; break;
      case 501: error.message = '服务未实现'; break;
      case 502: error.message = '网关错误'; break;
      case 503: error.message = '服务不可用'; break;
      case 504: error.message = '网关超时'; break;
      case 505: error.message = 'HTTP版本不受支持'; break;
      default: break;
      }
    }
    // errorLog(error);
    return Promise.reject(error);
  }
);
export default service;
