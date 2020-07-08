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
    height: 60px;
    padding: 10px 60px;
    background-color: #fff;

    display: inline-flex;
    width: 100%;
    align-items: center;

    // logo样式
    #logo {
        font-size: 1.3rem;
        font-weight: 600;
        color: #2c3e50;

        img {
            margin-right: 6px;
            height: 40px;
            vertical-align: middle;
        }
    }
}
</style>
