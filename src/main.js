import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 引入iview
import './plugins/iview.js';
// 引入axios
import './plugins/axios.js';

// 引用组件动态添加删除管理器
import compManager from './plugins/comp-manager/';
Vue.use(compManager);

global.ROOTVM = new Vue({
    render: h => h(App),
}).$mount('#app');
