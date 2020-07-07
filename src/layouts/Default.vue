<template>
    <i-Layout class="default-wrapper">
        <Header />
        <slot />
        <Footer v-if="isMain" />
    </i-Layout>
</template>

<script>
import Header from './Header';
import Footer from './Footer';

export default {
    components: { Header, Footer },
    // 只有主页显示footer
    props: { isMain: Boolean },
};
</script>
