<template>
    <div id="page">
        <Header fixed><Nav :navs="navs" /></Header>
        <aside id="sidebar">
            <li v-for="i in 100" :key="i">{{ i }}</li>
        </aside>
        <main id="main">
            <router-view class="page" />
        </main>
    </div>
</template>

<script>
import Nav from './includes/Nav';
import Header from './includes/Header';

export default {
    components: { Nav, Header },
    inject: ['CONFIG'],
    data() {
        return {
            navs: this.CONFIG.get('navs'),
        };
    },
};
</script>

<style lang="less">
@top-height: 61px;
@sidebar-width: 20rem;

#page {
    #sidebar {
        font-size: 15px;
        background-color: #fff;
        width: @sidebar-width;
        position: fixed;
        top: @top-height;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        border-right: 1px solid #eaecef;
        overflow-y: auto;
    }

    #main {
        padding-top: @top-height;
        padding-left: @sidebar-width;
    }
}
</style>
