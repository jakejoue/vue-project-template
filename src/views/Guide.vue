<template>
    <main>
        <li v-for="i in 100" :key="i">{{ i }}</li>
    </main>
</template>

<script>
export default {
    inject: ['CONFIG'],
    mounted() {},
};
</script>
