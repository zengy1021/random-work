// 基础的ajax 封装
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
// import { message, Modal } from 'antd';
// import qs from 'qs'
// import store from '@/store'
// import { Message } from 'element-ui'
// import {
//   proxyKey
// } from '@/const'
const codeMessage = {
  400: '客户端请求错误',
  401: '未认证',
  403: '禁止访问，请登录',
  404: '请求失败，未找到',
  405: '请求方法不允许',
  415: '请求的媒体类型有误',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务器暂时过载或维护',
  504: '网关超时',
};

// const locales = {
//   en: 'en-US',
//   zh: 'zh-CN'
// }
// const getLocale = () => {
//   const locale = localStorage.getItem('locale')
//   // 加en-US默认选项是防止用户浏览器首选语言设置为系统不支持的语言，比如德语之类的
//   return locales[locale] || 'en-US'
// }

// const baseUrl = process.env.NODE_ENV === 'production' ? `${proxyKey}/api` : '/api'
// const localUrl = !(process.env.NODE_ENV === 'production')
let requestFlag = false;
// 是否可以请求标识   true：阻止所有请求   false：允许请求
const http = (url: string, method: string, options: any = {}) => {
  const baseUrl = '';
  return (data: any, paramsSerializer: any = null) => {
    let params = data;
    // 数据处理
    let headers = options.headers || {
      contentType: 'application/json',
    };
    // const ignoreMessage = options.ignoreMessage
    let { contentType } = headers;
    if (contentType === 'application/x-www-form-urlencoded') {
      // data = qs.stringify(data)
    }
    if (contentType === 'application/json') {
      // debugger
      // params = qs.stringify(data)
    }

    // headers = Object.assign(
    //   {
    //     companyId: localStorage.companyId || '531521',
    //   },
    //   headers
    // );
    return new Promise((resolve, reject) => {
      const newOption: any = {
        url: baseUrl + url,
        method: method,
        data:
          method.toUpperCase() === 'POST' ||
          method.toUpperCase() === 'PUT' ||
          method.toUpperCase() === 'DELETE'
            ? data
            : null,
        params: method.toUpperCase() === 'GET' ? params : null,
        headers,
        crossOrigin: true,
        withCredentials: true,
        // paramsSerializer: paramsSerializer || null
      };
      axios(newOption)
        .then((response) => {
          const res = response.data;
          const code = response.status;
          if (res.code === 200) {
            requestFlag = false;
            resolve(res);
          } else {
            // message.error(res.message);
            return Promise.reject(res.message);
          }
        })
        .catch((err) => {
          // const response = err.response || {}
          // const resData = response.data || {}
          // const errors = resData.errors || []
          // const errorText =
          //   (errors[0] && errors[0].defaultMessage) ||
          //   codeMessage[response.status] ||
          //   err.message ||
          //   err.msg ||
          //   response.statusText ||
          //   ''
          // Message.error(errorText)
          reject(err);
        });
    });
  };
};

const httpGet = (url: string, options: any = {}) => {
  return http(url, 'get', options);
};

const httpPost = (url: string, options: any) => {
  return http(url, 'post', options);
};

const httpPut = (url: string, options: any) => {
  return http(url, 'put', options);
};

const httpDelete = (url: string, options: any) => {
  return http(url, 'delete', options);
};

export default {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
};
