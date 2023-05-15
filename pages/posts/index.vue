<template>
    <div>
        <Head>
            <Title>
                {{ page > 1 ? `内容列表 / 第${page}页` : '内容列表' }}
            </Title>
        </Head>
        <h1>内容列表</h1>
        <div v-if="pending">加载中...</div>
        <div class="post-list" v-if="posts !== null">
            <div v-for="post in posts" :key="post.id">
                <div>
                    <img :src="`${apiBaseUrl}/files/${post.file.id}/serve?size=thumbnail`" alt="">
                </div>
                <div>
                    <div>
                        <NuxtLink :to="`/posts/${post.id}`">
                            {{ post.title }}
                        </NuxtLink>
                    </div>
                    <div>
                        {{ post.content }}
                    </div>
                    <div>
                        - <small>{{ post.user.name }}</small>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <button @click="backward">上一页</button>
            <button @click="forward">下一页</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PostList } from '~~/types/post.type';
const {public:{apiBaseUrl}} = useRuntimeConfig()
// ?a=1&b=2 {a:1,b:2}
const {
    query:{
        page:pageNumber  // es6的解构重命名
    }
} = useRoute()

const router = useRouter()

const page = ref(pageNumber ? parseInt(`${pageNumber}`,10) : 1)
// hooks 编程 使用vueuse hooks库编写过hooks函数

const backward = () => {
    page.value--;
    updateQurey()
}
const forward = () => {
    page.value++;
    updateQurey()
}

const updateQurey = () => {
    router.push({query:{page:page.value}})
}

const {
    data:posts,
    pending,
    refresh,
    error
} = await useApiFetch<PostList>(() => `posts?page=${page.value}`)
refresh()
// console.log(posts)
watch(useRoute(), ({query}) => {
    if(query.page === undefined){
        page.value = 1
    }
})

</script>

<style scoped>

</style>