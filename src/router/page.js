// layouts各种页面样式布局
import Page from '../layouts/Page';

// views实际内容组件
import Guide from '../views/Guide';
import Api from '../views/Api';

// 注册一个Page布局
export default {
    path: '/',
    component: Page,
    children: [
        // 注册一个guide界面
        {
            name: 'guide',
            path: 'guide',
            component: Guide,
        },
        // Api界面
        {
            name: 'api',
            path: 'api',
            component: Api,
        },
    ],
};
