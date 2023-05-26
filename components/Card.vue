<template>
    <div class="section w-full relative px-6 pt-4 h-auto hover:bg-slate-100 hover:cursor-pointer">
        <div class="nolike absolute right-6 top-4 w-5 h-5 invisible">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="rgb(148 163 184)" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
        <div class="author w-full h-5 flex items-center">
            <div class="w-auto relative mr-4 h-5 leading-5 text-slate-500 hover:text-blue-400">{{ article.author.authorName }}</div>
            <div class="w-auto relative mr-4 h-5 leading-5 text-slate-400 hover:text-blue-400">{{ articleDate }}</div>
        </div>
        <div class="w-full h-10 text-lg leading-10 font-bold">
            {{ article.title }}
        </div>
        <div class="w-full h-7 leading-7 text-slate-400 truncate">
            {{ article.description }}
        </div>
        <div class="w-full h-10 border-b border-teal-200 flex items-center">
            <div class="liked w-auto h-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" :fill="article.liked?`blue`:`none`" viewBox="0 0 24 24" stroke-width="1" stroke="rgb(100 116 139)" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
                <span class="inline-block w-auto ml-1 h-3 leading-3 text-slate-500" :class="{active:article.liked}">{{ article.likesNum }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Article } from '~/types/article.type'
const props = defineProps<{
    article: Article
}>()

let articleDate = computed(() => {
    return props.article.deployDate.date
})

</script>

<style scoped>
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

.liked .active{
    color: blueviolet;
}
</style>