// 对于axios函数库进行二次封装
/*
 * 二次封装的目的是什么
 * 1. 利用axiox请求、响应拦截器功能
 * 2. 请求拦截器，一般可以在请求头中携带公共的参数：token
 * 3. 响应拦截器，可以简化服务器返回的数据，处理http网络错误
 */

import axios from 'axios';

import { ElMessage } from 'element-plus';

import useUserStore from '@/store/modules/user'

// 利用axios.create方法创建一个axios实例，可以设置基础路径、超时的时间

const request = axios.create({
    baseURL: "/api",
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
    let userStore = useUserStore();
    // token：用户登录了携带的参数
    if(userStore.userInfo.token){
        config.headers.token =userStore.userInfo.token;
    }
    

    // config：请求拦截器回调注入的对象（配置对象）
    // 通过请求头携带公共参数-token
    return config;
})


request.interceptors.response.use((response) => {
    // 响应拦截器成功的回调，一般会进行简化数据
    return response.data;
}, (error) => {
    // 失败的回调，处理http网络错误
    console.log(error);
    
    const status = error.response.status;
    switch (status) {
        case 404:
            ElMessage({
                type: "error",
                message: "请求失败路径出现问题"
            })
            break;
        case 500 | 501 | 502 | 503 | 504 | 505:
            ElMessage({
                type: "error",
                message: "服务器异常"
            })
            break;
        case 401:
            ElMessage({
                type: "error",
                message: "参数有误"
            })
            break;
    }
    return Promise.reject(new Error(error.message))
});

export default request;