<template>
    <router-view v-if="isInited" />
</template>

<script>
import initApplication from '@/utils/application';

export default {
    name: 'App',
    data() {
        return {
            isInited: false,
            ConfigMap: new Map(),
        };
    },
    provide() {
        return {
            CONFIG: this.ConfigMap,
        };
    },
    created() {
        this.$loading(true, '读取配置中......');

        initApplication()
            .then(config => {
                // 更新配置
                Object.keys(config).forEach(key => {
                    this.ConfigMap.set(key, config[key]);
                });
            })
            .finally(() => {
                this.isInited = true;
                this.$loading(false);
            });
    },
};
</script>
