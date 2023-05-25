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
            <div class="section w-full relative px-6 pt-4 h-auto hover:bg-slate-100 hover:cursor-pointer" v-for="item in 3" :key="item">
                <div class="nolike absolute right-6 top-4 w-5 h-5 invisible">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="rgb(148 163 184)" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div class="author w-full h-5 flex items-center" >
                    <div class="w-auto relative mr-4 h-5 leading-5 text-slate-500 hover:text-blue-400">掘金小册</div>
                    <div class="w-auto relative mr-4 h-5 leading-5 text-slate-400 hover:text-blue-400">3小时前</div>
                </div>
                <div class="w-full h-10 text-lg leading-10 font-bold">
                    2023前端面试真题之JS篇
                </div>
                <div class="w-full h-7 leading-7 text-slate-400 truncate">
                    大家好，我是柒八九。在如今的互联网大环境下，每天都充斥着各种负能量。有可能，你上午还在工位摸鱼，下午HR已经给你单独开小灶，很煞有介事的通知你，提前毕业了。在这个浮躁的互联网环境下，总有一种我们永远不知道明天和意外哪个先到的感觉。
                </div>
                <div class="w-full h-10 border-b border-teal-200 flex items-center">
                    <div class="liked w-auto h-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" :fill="false?`blue`:`none`" viewBox="0 0 24 24" stroke-width="1" stroke="rgb(100 116 139)" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                        </svg>
                        <span class="inline-block w-auto ml-1 h-3 leading-3 text-slate-500">666</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
const route = useRoute()

let article_mode = computed(() => {
    return route.query.article_mode || 'name'
})

let isloading = ref(true)

onMounted(() => {
    console.log(route.query)
    setTimeout(() => {
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

.author div:not(:first-child)::before{
    content: '';
    height: 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -8px;
    width: 1px;
    background-color: rgba(134, 130, 130, 0.4);
}

.liked:hover svg{
    stroke: blueviolet;
}

.liked:hover span{
    color: blueviolet;
}

.section:hover .nolike{
    visibility: visible;
}

.nolike > svg:hover{
    stroke: blueviolet;
}
</style>