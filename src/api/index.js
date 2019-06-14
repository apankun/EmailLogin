/**
 * api接口的统一出口
 */
// 文章模块接口
import list from './list';
import user from './user';
import stockPredict from './stockPredict';
import stock from './stock';

// 其他模块的接口……

// 导出接口
export default {
    list,
    user,
    stockPredict,
    stock
    // ……
}
