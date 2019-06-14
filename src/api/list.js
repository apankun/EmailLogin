/**
 * article模块接口列表
 */

import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const list = {
    //搜索股票
    searchStock(params) {
        return axios.post(`/list/searchStock`, qs.stringify(params));
    }
}

export default list;