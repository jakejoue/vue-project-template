import Vue from 'vue';
import { v1 } from 'uuid';

import Confirm from './confirm.vue';
import Delete from './delete.vue';
import { isString, isFunction, isArray, isObject } from 'util';

// 相关属性字段名称声明
const IDFIELD = '__modalId__';

// 实例化后的对象容器
const COMPS = new Map();

/**
 * vue实例化时需要附加的对象
 * @type {{store?: any, router?: any}}
 */
let VueConfig = {};

/**
 * 搜索已经实例化的vue实例
 * @param {String | Vue | Object} value
 */
function searchInstance(value) {
    if (isString(value)) {
        return COMPS.get(value);
    }
    if (value instanceof Vue) {
        let id;
        // 向上溯源
        do {
            id = value[IDFIELD];
            value = value.$parent;
        } while (!id && value);

        return COMPS.get(id);
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
 * @param {*} opt_options 相关配置信息
 */
function newInstance(value, opt_options = {}) {
    // 如果是vue组件
    if (isObject(value) && !(value instanceof Vue)) {
        let component;
        try {
            // 实例化vue组件
            const Instance = new Vue({
                ...VueConfig,
                render(h) {
                    return h(value, { ...opt_options });
                },
            });
            component = Instance.$mount();
            document.body.appendChild(component.$el);
        } catch (error) {
            component = null;
            // eslint-disable-next-line no-console
            console.error('dialog create error: ', value);
        }

        if (component) {
            // 实例化完毕，赋值实例化id和类型
            component.__constructor__ = value;
            component[IDFIELD] = v1();

            // 存入map对象进行管理
            COMPS.set(component[IDFIELD], component);

            // 返回对象
            return component;
        }
    }
}

/**
 * 销毁vue对象
 * @param {Vue} value vue对象
 */
function destroyInstance(value) {
    if (value instanceof Vue) {
        // 从仓库中删除
        if (COMPS.has(value[IDFIELD])) COMPS.delete(value[IDFIELD]);

        // 销毁vue对象
        try {
            value.$el.parentNode.removeChild(value.$el);
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

// 浮云框管理器
const DialogManager = {
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
        document.querySelector('*:focus') && document.querySelector('*:focus').blur();

        const modal = DialogManager.add(comp, { props }).$children[0];

        modal.$on('on-cancel', function () {
            if (isFunction(onCancel)) {
                onCancel();
            }
            DialogManager.remove(modal);
        });

        modal.$on('on-ok', function () {
            if (isFunction(onOk)) {
                onOk();
            }
            DialogManager.remove(modal);
        });

        return modal;
    },
};

export default {
    install(vue, config = {}) {
        VueConfig = config;

        // delete confirm 等静态界面
        vue.prototype.$Dialog = Dialog;

        // 动态界面管理
        vue.prototype.$DialogManager = DialogManager;
    },
};
