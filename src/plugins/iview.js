import Vue from 'vue';
import iview from 'view-design';

import '@/assets/styles/iview.less';

// 为Iview组件注册统一的前缀
Object.keys(iview).forEach(key => {
    const comp = iview[key];

    // vue组件一定是个对象
    if (typeof comp === 'object') {
        // 如果是个vue组件
        if (comp._compiled || !!comp.render || !!comp.mixins) {
            Vue.component('i-' + key, comp);
        }
    }
});

const { LoadingBar, Message, Modal, Notice, Spin } = iview;
Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Spin = Spin;

// 消息弹出框存在时长
Message.config({ duration: 3 });

// 全局loading模态框
Vue.prototype.$loading = (flag = false, html = 'Loading', { maskClosable, closeBack } = {}) => {
    if (flag) {
        this.$Spin.show({
            render: h => {
                return h('div', [
                    h('i-Icon', {
                        class: 'loading',
                        props: {
                            type: 'ios-loading',
                            size: 40,
                        },
                    }),
                    h('div', {
                        domProps: {
                            innerHTML: html,
                        },
                        style: {
                            fontSize: '20px',
                        },
                    }),
                ]);
            },
        });
        // 遮罩关闭
        if (maskClosable) {
            const el = document.querySelector('body>div.ivu-spin-fullscreen');
            if (el) {
                el.onclick = () => {
                    this.$Spin.hide();
                    // 关闭回调事件
                    if (closeBack) {
                        setTimeout(() => {
                            closeBack();
                        }, 0);
                    }
                };
            }
        }
    } else {
        this.$Spin.hide();
    }
};
