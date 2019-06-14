/**
 * article模块接口列表
 */

import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const list = {
    //注册
    register(params) {
        return axios.post(`/users/register`, qs.stringify(params))
    },
    //登录
    login(params) {
        return axios.post(`/users/login`, qs.stringify(params))
    },
    //修改密码
    resetpwd(params) {
        return axios.post(`/users/resetpwd`, qs.stringify(params))
    },
    //给我留言
    bbs(params) {
        return axios.post(`/users/bbs`, qs.stringify(params))
    },
   /* //搜索股票
    searchStock(params) {
        return axios.post(`/users/searchStock`, qs.stringify(params));
    },
    //显示所有股票
    allStocks(){
        return axios.post(`/users/allStocks`);
    },
    //在收藏夹里新增一条股票
    addLikedStock(params)
    {
        return axios.post(`/users/addLikedStock`, qs.stringify(params));
    },
    //在收藏夹里删除一条股票
    delLikedStock(params)
    {
        return axios.post(`/users/delLikedStock`, qs.stringify(params));
    },*/
    //所有用户
    allUsers() {
        return axios.post(`/users/all`)
    },
    //删除用户
    delUser(params) {
        return axios.post(`/users/delUser`, qs.stringify(params))
    },
}

export default list;
