<template>
    <main class="block w-[720px] h-[1500px] mx-auto rounded bg-white shadow shadow-cyan-500/50 overflow-hidden">
        <Head>
            <Title>首页</Title>
        </Head>
        <div class="h-14 w-full border-b flex items-center justify-start">
            <div class="h-7 relative w-20 text-center leading-7 text-base text-slate-400">
                <NuxtLink to="?article_mode=name">
                    <span :class="{ar_active:article_mode === 'name'}" class="ar hover:text-blue-400">
                        按名
                    </span>
                </NuxtLink>
            </div>
            <div class="h-7 relative w-20 text-center leading-7 text-base text-slate-400">
                <NuxtLink to="?article_mode=time">
                    <span href="?article_mode=time" :class="{ar_active:article_mode === 'time'}" class="ar hover:text-blue-400">
                        最新
                    </span>
                </NuxtLink>
            </div>
        </div>
        <div class="h-auto w-full inline-block">
            <div class="w-full relative px-6 pt-4" v-if="isloading">
                <n-skeleton text :repeat="1" style="width: 40%" /> 
                <n-skeleton text :repeat="1" style="width: 70%" /> 
                <n-skeleton text :repeat="2" /> 
                <n-skeleton text :repeat="1" style="width: 70%" /> 
            </div>
            <div class="w-auto h-auto" v-for="item in articleList" :key="item.id">
                <Card :article="item"></Card>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import {articleList as postData} from '~/mock/article'
import { Article } from '../types/article.type';
const route = useRoute()

let article_mode = computed(() => {
    return route.query.article_mode || 'name'
})
let articleList = reactive<Article[]>([])

let isloading = ref(true)

onMounted(() => {
    console.log(route.query)
    setTimeout(() => {
        articleList = postData
        isloading.value = false
    }, 2000);
    
})

</script>

<style scoped>
.ar_active{
    color: black;
}

.ar_active:hover{
    --tw-text-opacity: 1;
    color: rgba(96, 165, 250, var(--tw-text-opacity));
}

.ar::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}

.ar_active::after{
    content: '';
    position: absolute;
    width: 40%;
    height: 2px;
    left: 30%;
    bottom: -14px;
    background-color:blueviolet;
    border-radius: 1px;
}
</style>