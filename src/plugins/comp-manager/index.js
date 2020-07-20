import Vue from 'vue';

import Confirm from './Confirm.vue';
import Delete from './Delete.vue';
import { isString, isFunction, isArray, isObject } from 'util';

// 实例化后的对象容器
const COMPS = new Map();

/**
 * vue实例化时需要附加的对象
 * @type { {store?: any, router?: any} }
 */
let VUE_CONFIG = {};

/**
 * 搜索已经实例化的vue实例
 * @param {String | Vue | Object} value
 */
function searchInstance(value) {
    if (isString(value)) {
        return COMPS.get(value);
    }
    if (value instanceof Vue) {
        return value.__constructor__
            ? value
            : value.$parent && value.$parent.__constructor__
            ? value.$parent
            : null;
    }
    if (isObject(value)) {
        const comps = [];
        COMPS.forEach(comp => {
            if (comp.__constructor__ === value) {
                comps.push(comp);
            }
        });

        return comps.length ? comps : null;
    }
}

/**
 * 实例化vue组件
 * @param {Object} value vue组件
 * @param {*} optOptions 相关配置信息
 */
function newInstance(value, optOptions = {}) {
    // 如果是vue组件
    if (isObject(value) && !(value instanceof Vue)) {
        try {
            // 实例化vue组件
            const component = new Vue({
                ...VUE_CONFIG,
                ...optOptions,
                render(h) {
                    return h(value, { ...optOptions });
                },
            });
            component.__constructor__ = value;
            component.$mount();

            return component;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('dialog create error: ', value);
        }
    }
}

/**
 * 销毁vue对象
 * @param {Vue} value vue对象
 */
function destroyInstance(value) {
    if (value instanceof Vue) {
        // 销毁vue对象
        try {
            value.$destroy();

            return true;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('dialog destroy error: ', value);
            return false;
        }
    }
    return true;
}

// 组件管理器
const CompManager = {
    add() {
        /**
         * 添加多个浮云框的时候，只有一个变量，且变量为数组
         * 例: [[modal1, opt_options1], modal2...]
         */
        if (arguments.length === 1 && isArray(arguments[0])) {
            return arguments[0].map(value => {
                let modal, config;

                // 如果不包含配置项
                if (!isArray(value)) modal = value;
                else {
                    modal = value[0];
                    config = value[1];
                }

                // 返回构造实例
                return newInstance(modal, config);
            });
        }
        /**
         * 单一模式添加（返回当前对象实例）
         */
        return newInstance(arguments[0], arguments[1]);
    },
    remove(...rest) {
        // 多个值
        const resultStatus = rest.map(value => {
            value = searchInstance(value);
            // 如果查询出来的是个数组
            if (isArray(value)) {
                return value.map(destroyInstance);
            }
            // 不是数组
            return destroyInstance(value);
        });

        // 单一值返回的时候
        if (arguments.length === 1) {
            return resultStatus[0];
        }
        // 多个值返回的时候
        return resultStatus;
    },
    search(value) {
        return searchInstance(value);
    },
    checkAdd(value) {
        const res = this.search(value);
        if (!res) {
            return this.add(...arguments);
        } else {
            return res;
        }
    },
    /**
     * 删除全部浮云框
     */
    clear() {
        COMPS.forEach(_comp => destroyInstance(_comp));
        COMPS.clear();
    },
};

// 常用的浮云框，delete，confirm等
const Dialog = {
    confirm(option) {
        return this.openDialog(Confirm, option);
    },
    delete(option) {
        return this.openDialog(Delete, option);
    },
    openDialog(comp, option) {
        let props = {},
            onOk,
            onCancel;

        if (isString(option)) {
            props = { message: option };
        } else {
            onOk = option.onOk;
            onCancel = option.onCancel;
            props = { ...option };
        }

        // 去除当前焦点元素
        document.querySelector('*:focus') &&
            document.querySelector('*:focus').blur();

        const modal = CompManager.add(comp, { props }).$children[0];

        modal.$on('on-cancel', function () {
            if (isFunction(onCancel)) {
                onCancel();
            }
            CompManager.remove(modal);
        });

        modal.$on('on-ok', function () {
            if (isFunction(onOk)) {
                onOk();
            }
            CompManager.remove(modal);
        });

        return modal;
    },
};

export default {
    /**
     * 新建vue
     * @param {Vue} vue vue对象
     * @param {*} config 配置
     */
    install(vue, config = {}) {
        VUE_CONFIG = config;

        // delete confirm 等静态界面
        vue.prototype.$Dialog = Dialog;

        // 动态界面管理
        vue.prototype.$CompManager = CompManager;

        vue.mixin({
            mounted() {
                if (this.__constructor__) {
                    COMPS.set(this._uid, this);

                    if (!this.$el.parentNode) {
                        document.body.appendChild(this.$el);
                    }
                }
            },
            beforeDestroy() {
                const node = searchInstance(this);

                if (node) {
                    // 移除节点
                    if (node.$el && node.$el.parentNode) {
                        node.$el.parentNode.removeChild(node.$el);
                    }
                    // 从容器中移除
                    if (COMPS.has(node._uid)) {
                        COMPS.delete(node._uid);
                    }
                }
            },
        });
    },
};
