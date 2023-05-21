<template>
    <div>
        <Head>
            <Title>首页</Title>
        </Head>
        <div @click="router.push({path:'/about'})">关于</div>
        <div @click="router.push({path:'/user'})">用户</div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()

</script>

<style scoped>

</style>