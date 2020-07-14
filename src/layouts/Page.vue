<template>
    <div id="page">
        <Header fixed><Nav :navs="navs" /></Header>
        <Aside :asides="asides" />
        <main id="main">
            <router-view class="page" />
        </main>
    </div>
</template>

<script>
import Nav from './includes/Nav';
import Aside from './includes/Aside';
import Header from './includes/Header';

export default {
    components: { Nav, Aside, Header },
    inject: ['CONFIG'],
    data() {
        return {
            navs: this.CONFIG.get('navs'),
        };
    },
    computed: {
        // 侧边导航
        asides() {
            const navKey = this.$route.meta.navKey;
            return this.CONFIG.get(navKey);
        },
    },
};
</script>

<style lang="less">
@top-height: @header-height + 1px;

#page {
    #main {
        padding-top: @top-height;
        padding-left: @sidebar-width + 20px;

        .page {
            padding: 15px 30px 100px;
            max-width: @content-width;
            margin: 0 auto;
        }
    }
}
</style>
