// 书写配置项时，请注意浏览器对语法的兼容性

module.exports = {
    // 需要激活的配置项，只对打包后有效，开发模式默认读取dev
    active: 'prod',

    // 导航栏目录
    navs: [
        { text: '指南', to: '/guide' },
        // { text: 'API参考', to: '/api' },
        {
            text: '应用示例',
            children: [{ text: '地图', to: '/map' }],
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

    // guides
    guides: [
        { text: '介绍' },
        {
            text: '开始',
            children: [
                {
                    text: '目录结构',
                },
                {
                    text: '默认配置',
                },
                {
                    text: '运行流程',
                },
            ],
        },
        {
            text: '进阶',
            children: [
                {
                    text: '编码风格规范',
                    children: [
                        {
                            text: '命名规范',
                        },
                        {
                            text: '组件定义和使用',
                        },
                        {
                            text: '编程风格',
                        },
                    ],
                },
                {
                    text: 'vue插件开发',
                },
                {
                    text: '相关技术使用实践',
                },
            ],
        },
        { text: '杂项' },
    ],

    // api
    apis: [],
};
