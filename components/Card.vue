<template>
    <div class="section w-full relative px-6 pt-4 h-auto hover:bg-slate-100 hover:cursor-pointer" @click="openDetail(article.id)">
        <n-popover trigger="hover" placement="left-start" class="rounded-md bg-white overflow-hidden" raw :show-arrow="false">
            <template #trigger>
                <div class="nolike absolute right-6 top-4 w-5 h-5 invisible" @click.stop="()=>{}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="rgb(148 163 184)" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </template>
            <div class="flex items-center w-[200px] h-10 px-4 hover:cursor-pointer hover:bg-slate-100" @click="notInterested">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                <span class="block flex-1 ml-2">不感兴趣</span>
            </div>
            <div class="flex items-center w-[200px] h-10 px-4 hover:cursor-pointer hover:bg-slate-100" @click="notThisOne">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
                <span class="block flex-1 ml-2 truncate">屏蔽作者：{{ article.author }}</span>
            </div>
        </n-popover>
        <div class="author w-full h-5 flex items-center">
            <div class="w-auto relative mr-4 h-5 leading-5 text-slate-500 hover:text-blue-400">{{ article.author }}</div>
            <div class="w-auto relative mr-4 h-5 leading-5 text-slate-400 hover:text-blue-400">{{ articleDate }}</div>
        </div>
        <div class="w-full h-10 text-lg leading-10 font-bold">
            {{ article.title }}
        </div>
        <div class="w-full h-7 leading-7 text-slate-400 truncate">
            {{ article.description }}
        </div>
        <div class="w-full h-10 border-b border-teal-200 flex items-center">
            <div class="liked w-auto h-4 flex items-center" @click.stop="onLikeOne">
                <svg xmlns="http://www.w3.org/2000/svg" :fill="article.liked?`blue`:`none`" viewBox="0 0 24 24" stroke-width="1" stroke="rgb(100 116 139)" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
                <span class="inline-block w-auto ml-1 h-3 leading-3 text-slate-500" :class="{active:article.liked}">{{ article.likesNum }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDateBefore } from '~/composables/use-date-before'
import { Article } from '~/types/article.type'
import { useMessage,useDialog } from 'naive-ui'

const message = useMessage()
const dialog = useDialog()

const props = defineProps<{
    article: Article
}>()

let articleDate = computed(() => {
    return useDateBefore(props.article.deployDate)
})

const emits = defineEmits(['likeOne','deleteOne'])

/**
 * 每个组件有自己的实例
 * debounce会在每个自己的实例上触发
 * debounce失效也是因为模板渲染时释放所有临时变量
 * 所以要放在全局属性上才生效
 */
const debouncedFn = useDebounceFn((callback:Function) => {
    callback()
}, 1000)

/**
 * 开启新页面打开详情页
 * @param id 文章id
 */
function openDetail(id:number){
    window.open('/detail?postId=' + id, '_blank')
}

/**
 * 点赞或者取消赞
 */
function onLikeOne(){
    emits('likeOne',props.article.id)
    debouncedFn(() => {console.log(props.article.id,'////')})
}

/**
 * 不敢兴趣
 */
function notInterested(){
    emits('deleteOne',{id:props.article.id})
    message.success('好的，我们将减少此类推荐')
}

/**
 * 不看某个作者
 */
async function notThisOne(){
    const dialogWindow = dialog.warning({
        title: '警告',
        content: '你确定屏蔽作者:【' + props.article.author + '】吗？首页将不会出现这位作者的推荐。',
        positiveText: '确定',
        blockScroll:true,
        negativeText: '取消',
        onPositiveClick:() => {
            dialogWindow.loading = true
            dialogWindow.negativeText = undefined
            const promise = new Promise((resolve) => {
                emits('deleteOne', {id:props.article.id, res:() => {resolve('success')}});
            });

            return promise.then(() => {
                message.success('成功取消推荐该作者');
            });
        }
    })
}

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