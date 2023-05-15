<template>
    <div>
        <Head>
            <title>首页</title>
        </Head>
        <h1>首页</h1>
        <div>我在掘金网学习前端全栈</div>
        <div @click="router.push({path:'/about'})">关于我们</div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()

</script>

<style scoped>

</style>