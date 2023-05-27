<template>
    <main class="block w-[800px] h-auto mx-auto rounded bg-white shadow shadow-cyan-500/50 overflow-hidden">
        <Head>
            <Title>详情</Title>
        </Head>
        <article class="prose max-w-none">
            <div class="w-[800px] px-8" v-html="$htmlInject(serverHtmlParam)"></div>
        </article>
    </main>
</template>

<script setup lang="ts">
import 'highlight.js/styles/github-dark-dimmed.css';
import Hljs from 'highlight.js';
const route = useRoute()
const { $htmlInject } = useNuxtApp()
let serverHtmlParam = ref("<p><img src=\"https://th.bing.com/th?id=OIP.De4iKAMeTvWwPQxXNK74ZgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2\" alt=\"测试图片\" title=\"test\"></p>\n<pre><code>let a = 1;\nlet b = 2;\nconst function(a,b){\n    return a + b\n}\n</code></pre>\n<h1 id=\"test\">test</h1>\n<h2 id=\"test1\">test1</h2>\n<h3 id=\"test2\">test2</h3>\n<ul>\n<li>xxxxxx<ul>\n<li>xx</li>\n<li>xx</li>\n</ul>\n</li>\n<li>xxxxxx<ul>\n<li>xx</li>\n<li>xx</li>\n</ul>\n</li>\n<li>xxxxxx<ul>\n<li>xx</li>\n<li>xx</li>\n<li>修改后的md</li>\n</ul>\n</li>\n</ul>\n<h3 id=\"你对npm和yarn等包管理工具的理解\">你对npm和yarn等包管理工具的理解</h3>\n<ul>\n<li>早期的npm非常简单，没有解决<strong>循环依赖</strong>问题，导致形成的依赖树非常巨大，这样带来的后果就是造成不必要的资源浪费。</li>\n</ul>\n")

// const { data, error } = useAsyncData(async () => {
//     const response = await fetch('https://api.example.com/data')
//     console.log('//////')
//     return response.json()
// })

onMounted(() => {
    Hljs.highlightAll();
})
</script>

<style scoped>

</style>