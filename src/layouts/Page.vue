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
        padding: 0 60px 30px;
        padding-top: @top-height;

        .page {
            padding: 35px 0;
            padding-left: 50px;
            max-width: @content-width;
            margin: 0 auto;
        }

        pre {
            background-color: #f8f8f8;
            border-radius: 2px;

            code {
                position: relative;
                overflow-x: auto;
                display: block;
                padding: 1.2em 1.4em;
                line-height: 1.6em;

                &::before {
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #ccc;
                    text-align: right;
                    font-size: 0.9em;
                    padding: 5px 10px 0;
                    line-height: 15px;
                    height: 15px;
                    font-weight: 600;
                }

                &.language-vue::before {
                    content: 'VUE';
                }
                &.language-html::before {
                    content: 'HTML';
                }
                &.language-js::before {
                    content: 'JS';
                }
                &.language-css::before {
                    content: 'CSS';
                }
                &.language-less::before {
                    content: 'LESS';
                }
            }
        }
    }
}

@media screen and (max-width: @mq-narrow) {
    #page #main .page {
        margin-left: @sidebar-width + 10px;
    }
}
</style>
