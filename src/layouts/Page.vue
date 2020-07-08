<template>
    <div id="page">
        <Header />
        <router-view />
    </div>
</template>

<script>
import Header from './includes/Header';

export default {
    components: { Header },
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
