<template>
    <header id="header">
        <router-link to="/" id="logo">
            <img src="@/assets/img/logo.png" alt="vue logo" />
            <span>{{ name }}</span>
        </router-link>
        <slot />
    </header>
</template>

<script>
import packageJson from '@/../package.json';

export default {
    data() {
        return {
            name: packageJson.name,
        };
    },
};
</script>

<style lang="less">
#header {
    background-color: #fff;
    padding: 10px 60px;

    // logo样式
    #logo {
        display: inline-block;
        font-size: 1.3rem;
        font-weight: 600;
        color: #2c3e50;
        position: relative;

        img {
            vertical-align: middle;
            margin-right: 6px;
            width: 40px;
            height: 40px;
        }
    }
}
</style>
