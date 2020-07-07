import Vue from 'vue';
import Axios from 'axios';

// 请求时带上cookies
Axios.defaults.withCredentials = true;

// 附加一个axios请求参数
Vue.prototype.$axios = Axios;
