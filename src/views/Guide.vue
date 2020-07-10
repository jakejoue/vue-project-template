<template>
    <main>
        <p v-for="i in 100" :key="i">{{ i }}</p>
    </main>
</template>

<script>
export default {
    inject: ['CONFIG'],
    mounted() {},
};
</script>
