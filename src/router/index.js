import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// layouts各种页面样式布局
import Default from '../layouts/Default';
import Page from '../layouts/Page';
import ErrorLayout from '../layouts/Error';

// views实际内容组件
import Main from '../views/Main';
import Guide from '../views/Guide';

const router = new VueRouter({
    routes: [
        // 注册一个默认布局（一般用于主页相关）
        {
            path: '/',
            component: Default,
            children: [
                // 注册主页
                {
                    name: 'main',
                    path: '',
                    component: Main,
                },
            ],
        },
        // 注册一个Page布局
        {
            path: '/',
            component: Page,
            children: [
                // 注册一个guide界面
                {
                    name: 'guide',
                    path: 'guide',
                    component: Guide,
                },
            ],
        },
        /**
         * 错误界面，放到最后（降低匹配的优先级）
         * 传递一个code，这里是个偷懒的写法（请根据需求定制错误界面）
         */
        {
            path: '/:code',
            component: ErrorLayout,
            beforeEnter: (to, from, next) => {
                const code = to.params.code;
                // 非数字错误
                if (isNaN(+code) && code !== 'unknown') {
                    next('/unknown');
                } else {
                    next();
                }
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    // 不存在匹配要素的时候返回到404
    if (!to || to.matched.length === 0) {
        next('/404');
    } else {
        next();
    }
});

export default router;
