import Vue from 'vue';

/**
 * 扩展unWatch属性（声明不需要被vue监听的对象）
 */
Vue.mixin({
    created: function () {
        const list = [this.$options];
        while (list.length) {
            const item = list.shift();
            // 如果存在unWatch属性
            if (item.unWatch) {
                Object.assign(this, item.unWatch.call(this));
            }
            // 如果存在mixixns属性
            if (item.mixins) {
                list.push(...item.mixins);
            }
        }
    },
});
