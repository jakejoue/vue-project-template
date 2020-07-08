<template>
    <div>
        <Header>
            <Nav></Nav>
        </Header>
        <router-view />
        <Footer />
    </div>
</template>

<script>
import Nav from './includes/nav/Nav';
import Header from './includes/Header';
import Footer from './includes/Footer';

export default {
    components: { Nav, Header, Footer },
};
</script>
