<template>
    <header id="header" :class="{ fixed }">
        <router-link to="/" id="logo">
            <img v-if="fixed" src="@/assets/img/logo.png" alt="vue logo" />
            <span>{{ name }}</span>
        </router-link>
        <slot />
    </header>
</template>

<script>
import packageJson from '@/../package.json';

export default {
    props: { fixed: Boolean },
    data() {
        return {
            name: packageJson.name,
        };
    },
};
</script>

<style lang="less">
#header {
    height: @header-height;
    padding: 10px 60px;
    background-color: #fff;

    display: inline-flex;
    width: 100%;
    align-items: center;

    // logo样式
    #logo {
        font-size: 1.5rem;
        font-weight: 600;
        color: #2c3e50;

        img {
            margin-right: 6px;
            height: @header-height - 20px;
            vertical-align: middle;
        }
    }

    // fixed下的样式
    &.fixed {
        position: fixed;
        top: 0;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
        transition: background-color 0.3s ease-in-out;
    }
}
</style>
