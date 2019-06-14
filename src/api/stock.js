/**
 * article模块接口列表
 */

import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const stocklist = {
    //显示预测准确率前50名的用户和其预测准确率
    getRank() {
        return axios.post(`/stocks/getRank`);
    },
    //显示所有的股票
    getAll(params) {
        return axios.post(`/stocks/getAll`, qs.stringify(params));
    },
    //显示用户User所收藏的股票
    stockFavorite(params) {
        return axios.post(`/stocks/stockFavorite`, qs.stringify(params));
    },
    //在收藏夹里新增一条股票
    addLikedStock(params) {
        return axios.post(`/stocks/addFavorite`, qs.stringify(params));
    },
    //在收藏夹里删除一条股票
    delLikedStock(params) {
        return axios.post(`/stocks/delFavorite`, qs.stringify(params));
    }
}

export default stocklist;
