<template>
    <div>
        <Header><Nav :navs="navs" /></Header>
        <router-view />
        <Footer />
    </div>
</template>

<script>
import Nav from './includes/Nav';
import Header from './includes/Header';
import Footer from './includes/Footer';

export default {
    components: { Nav, Header, Footer },
    data() {
        return {
            navs: [
                { text: '指南', to: '/guide' },
                { text: 'API参考', to: '/api' },
                {
                    text: '应用示例',
                    children: [{ text: '地图', to: './map' }],
                },
                {
                    text: '相关技术',
                    children: [
                        {
                            text: 'vue技术',
                            children: [
                                { text: 'vue.js', to: 'https://cn.vuejs.org/' },
                                { text: 'vue-router', to: 'https://router.vuejs.org/zh/' },
                                { text: 'vuex', to: 'https://vuex.vuejs.org/zh/' },
                                {
                                    text: 'vue-jsx',
                                    to: 'https://github.com/vuejs/babel-plugin-transform-vue-jsx',
                                },
                            ],
                        },
                        {
                            text: 'UI框架',
                            children: [{ text: 'iview', to: 'https://iviewui.com/docs/introduce' }],
                        },
                        {
                            text: '其他',
                            children: [
                                { text: 'ES6入门教程', to: 'https://es6.ruanyifeng.com/' },
                                { text: 'less教程', to: 'http://lesscss.cn/' },
                            ],
                        },
                    ],
                },
                {
                    text: 'GitHub',
                    to: 'http://172.17.0.202/huangwei/vue-project-template',
                    suffix: 'logo-github',
                },
            ],
        };
    },
};
</script>
