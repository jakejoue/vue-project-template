<template>
    <transition name="fade">
        <router-view v-if="isInited" />
    </transition>
</template>

<script>
import { initHttpUtil, request } from '@/utils/http';

export default {
    name: 'App',
    data() {
        return {
            isInited: true,
        };
    },
    created() {
        this.initOutConifg().then(CONFIG => {
            initHttpUtil(CONFIG);

            global.CONFIG = CONFIG;
        });
    },
    methods: {
        async initConfig() {},
        /**
         * 初始化外部配置
         */
        async initOutConifg() {
            const self = this;
            // 读取配置的方法
            const readConfig = async function (path = '') {
                return self.$axios
                    .get('./config/application' + path + '.js')
                    .then(({ data }) =>
                        eval(
                            `(function() {var module = {exports:{}}; ${data}; return module.exports;})()`
                        )
                    );
            };

            // 基础配置
            const baseConfig = await readConfig();

            // 激活的配置项
            const { active } = baseConfig;
            // 其他配置项的配置
            let otherConfig = {};

            // 如果是开发模式
            if (envIsDebug) {
                otherConfig = await readConfig('.dev');
            } else if (active) {
                otherConfig = await readConfig('.' + active);
            }

            // return
            return { ...baseConfig, ...otherConfig };
        },
        /**
         * 初始化服务器配置
         * todo: 请根据需求实现
         */
        async initServerConfig() {
            return request('port');
        },
    },
};
</script>
