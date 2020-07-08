<template>
    <nav id="nav">
        <router-link to="/">
            主页
        </router-link>
        <router-link to="/guide">
            指南
        </router-link>
    </nav>
</template>

<script>
export default {};
</script>

<style lang="less">
#nav {
    flex: 1;

    display: inline-flex;
    justify-content: flex-end;
}
</style>
