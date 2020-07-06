import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import '@/plugins/iview.js';

global.rootVm = new Vue({
    render: h => h(App),
}).$mount('#app');
