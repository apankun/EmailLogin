/**
 * article模块接口列表
 */

import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const stocklist = {

    //搜索股票
    getByStockId(params) {
        return axios.post(`/stockPredicts/getByStockId`, qs.stringify(params));
    },
    //显示所有股票
    stockPredicts() {
        return axios.post(`/stockPredicts/stockPredicts`);
    },
    //显示用户User所收藏的股票
    stockFavorite(params) {
        return axios.post(`/stockPredicts/stockFavorite`, qs.stringify(params));
    },
    //在收藏夹里新增一条股票
    addLikedStock(params) {
        return axios.post(`/stockPredicts/addLikedStock`, qs.stringify(params));
    },
    //在收藏夹里删除一条股票
    delLikedStock(params) {
        return axios.post(`/stockPredicts/delLikedStock`, qs.stringify(params));
    }
}

    export default stocklist;
