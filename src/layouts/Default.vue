<template>
    <div>
        <Header />
        <router-view />
        <Footer />
    </div>
</template>

<script>
import Header from './includes/Header';
import Footer from './includes/Footer';

export default {
    components: { Header, Footer },
};
</script>
