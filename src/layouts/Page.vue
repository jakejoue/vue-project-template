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
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll() {
            setTimeout(() => {
                this.setActiveHash();
            }, 300);
        },
        setActiveHash() {
            // const sidebarLinks = [].slice.call(
            //     document.querySelectorAll('#aside .ivu-menu-item')
            // );
            const anchors = document.querySelectorAll('#main .headerlink');

            const scrollTop = Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop
            );

            for (let i = 0; i < anchors.length; i++) {
                const anchor = anchors[i];
                const nextAnchor = anchors[i + 1];

                const isActive =
                    (i === 0 && scrollTop === 0) ||
                    (scrollTop >= anchor.offsetTop - 100 &&
                        (!nextAnchor || scrollTop < nextAnchor.offsetTop + 50));
                if (isActive) {
                    console.log(anchor);
                }
            }
        },
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
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
