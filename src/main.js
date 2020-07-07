import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 引入iview
import './plugins/iview.js';
// 引入axios
import './plugins/axios.js';

// 引用dialog插件
import dialog from './plugins/dialog/';
Vue.use(dialog);

global.ROOTVM = new Vue({
    render: h => h(App),
}).$mount('#app');
