<template>
    <div id="page">
        <Header isPage><Nav /></Header>
        <router-view />
    </div>
</template>

<script>
import Nav from './includes/Nav';
import Header from './includes/Header';

export default {
    components: { Nav, Header },
    data() {
        return {
            menus: [],
        };
    },
};
</script>

<style lang="less">
#page {
    padding-top: 61px;

    #header {
        position: fixed;
        top: 0;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
        transition: background-color 0.3s ease-in-out;
    }
}
</style>
