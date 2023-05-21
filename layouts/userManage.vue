<template>
    <div class="page_container">
        <div class="page_aside">
            这里是aside
        </div>
        <div class="page_main">
            这里是main
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import '~/assets/styles/main.css';

</style>