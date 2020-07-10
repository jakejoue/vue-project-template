<template>
    <div id="page">
        <Header fixed><Nav :navs="navs" /></Header>
        <aside id="sidebar">
            <Nav :navs="navs" is-side-bar />
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
@sidebar-width: 280px;

#page {
    #sidebar {
        position: fixed;
        top: @top-height;
        left: 0;
        bottom: 0;
        border-right: 1px solid #eaecef;

        box-sizing: content-box;
        width: @sidebar-width;
        padding: 35px 0px 60px 20px;

        font-size: 15px;
        overflow-y: auto;
    }

    #main {
        padding: 0 60px 30px;
        padding-top: @top-height;

        .page {
            padding: 35px 0;
            padding-left: 50px;
            max-width: 750px;
            margin: 0 auto;
        }
    }
}
</style>
