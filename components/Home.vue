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
                    <span :class="{ar_active:article_mode === 'time'}" class="ar hover:text-blue-400">
                        最新
                    </span>
                </NuxtLink>
            </div>
        </div>
        <div class="h-auto w-full inline-block">
            <div class="w-full relative px-6 pt-4" v-if="state.isloading">
                <n-skeleton text :repeat="1" style="width: 40%" /> 
                <n-skeleton text :repeat="1" style="width: 70%" /> 
                <n-skeleton text :repeat="2" /> 
                <n-skeleton text :repeat="1" style="width: 70%" /> 
            </div>    
            <div class="w-auto h-auto" v-for="item in state.articleList" :key="item.id">
                <Card :article="item" @likeOne="likeOne" @deleteOne="deleteOne"></Card>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { Ref } from 'vue';
import { Article } from '../types/article.type';
import {eventData_type1} from '../types/emits.type'
import _ from 'lodash'
const route = useRoute()
const articleStore = useArticleStore()

let state = reactive({
    articleList:[] as Article[],
    isloading:true as boolean
})
let article_mode = computed(() => {
    return route.query.article_mode || 'name'
})

/**
 * 点赞或者取消赞
 * @param id 文章id
 */
function likeOne(id:number){
    articleStore.likeOneSync(id)
}

/**
 * 从文章列表中删除某个文章
 * @param eventData 包括文章id 和是否异步resolve
 */
function deleteOne(eventData:eventData_type1){
    if(eventData.res){
        articleStore.deleteOneAsync(eventData.id)
            .then(() => {
                eventData.res!()
            })
    }else{
        articleStore.deleteOneSync(eventData.id)
    }
}

onMounted(() => {
    articleStore.init()
        .then((res) => {
            state.articleList = articleStore.state.articleList
            state.isloading = false
            console.log(res)
        })
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