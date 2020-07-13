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
        {
            name: '指南',
            path: 'guide',
            meta: { navKey: 'guides' },
            component: Guide,
        },
        {
            name: 'api参考',
            path: 'api',
            meta: { navKey: 'apis' },
            component: Api,
        },
    ],
};
