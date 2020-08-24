import axios from 'axios'
import ElementUI from 'element-ui';
import router from './../../router'

var host = window.location.hostname;
var port = window.location.port;
var protocol = window.location.protocol;
var baseURL = protocol + '//' + host + ":" + port
// var baseURL = 'http://192.168.1.201:8080/'
console.log(baseURL)

const instance = axios.create({
    headers: {
        'content-type': 'application/json;charset=utf8',
    },
    baseURL: baseURL,
    timeout: 10000,
    withCredentials: false
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
    //console.log(window.localStorage.getItem("token"))
    config.headers['auth_token'] = window.localStorage.getItem("token") || ''
    return config;
}, error => {
    // 请求错误时做些事
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
    console.log(response)
    // 对响应数据做些事
    if (response.status === 200) {
        if (response.data && response.data.code === 0) {
            return response // 在请求成功后可以对返回的数据进行处理，再返回到前台
        } else if (response.data && response.data.code === -56506) {
            ElementUI.Message({
                title: '',
                message: '登录过期,请重新登录！',
                type: 'error'
            });
            router.push({ path: '/' })
            return response // 在请求成功后可以对返回的数据进行处理，再返回到前台
        } else {
            window.console.log(response.data)
            //this.$message.error(response.data.data.msg)
        }
    }
    return response;
}, error => {
    console.log(error)
    //this.$message.error(error.response.data)
    return Promise.reject(error); // 返回接口返回的错误信息
})



/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function getData(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(baseURL + url, {
            params: params
        }).then(res => {
            console.log(res)
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function postData(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(baseURL + url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                console.log(err)
                reject(err.data)
            })
    });
}

export default instance;







