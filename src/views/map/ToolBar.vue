<template>
    <div class="geo-toolbar">
        <span>
            <router-link to="/">返回主页</router-link>
        </span>
        <span>查看源码</span>
    </div>
</template>

<script>
export default {
    inject: ['MapView'],
    mounted() {},
};
</script>

<style lang="less">
.geo-toolbar {
    position: absolute;
    right: 10px;
    top: 10px;

    background-color: @component-background;

    span {
        display: inline-block;
        padding: 0.3em 1em;
        border: 1px solid @border-color;
        margin-left: -1px;
    }
}
</style>
