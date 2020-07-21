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
            config: {},
        };
    },
    provide() {
        return {
            CONFIG: this.config,
        };
    },
    created() {
        this.$loading(true, '读取配置中......');

        initApplication()
            .then(config => {
                Object.keys(config).forEach(key => {
                    this.config[key] = config[key];
                });
                this.isInited = true;
            })
            .catch(() => {
                this.$Message.error('配置读取错误！');
            })
            .finally(() => {
                this.$loading(false);
            });
    },
};
</script>
