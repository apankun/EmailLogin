import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import './common/style/common.scss'
import api from './api'
import {JSEncrypt} from 'jsencrypt'
import echarts from 'echarts';
import scroll from 'vue-seamless-scroll'
Vue.use(ElementUI)
Vue.use(scroll)
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$getCode=function(password){
    let encrypt=new JSEncrypt();
    encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDltP2SUym90rX4Tr6Mdj/YfrnUrFg7P689384hNm6xQxkbLcqd+/D5XoU4nUAtclIWHFFO70FKUoHQmZr3mgXB/z614ag799lFUc3yPuRTIzE4eRPCoqd+YRfBI3mOa3G1MxYIztkJk5FEFrkF8BCLW9EVFpZvnMvF2nciVrtqQIDAQAB')
    let data=encrypt(password);
}
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
