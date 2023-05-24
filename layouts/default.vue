<template>
    <div class="h-screen w-full relative z-50 inline-block bg-slate-100">
        <div class="h-20 fixed w-full left-0 duration-300 z-40 flex items-center bg-white shadow shadow-cyan-500/50" :style="`top:${headerTop >= 400 ? -80 : 0}px`">    
            <Header />
        </div>
        <div class="h-auto w-full bg-slate-100 pb-3">
            <div class="block mt-24">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';
// import type { CurrentUser } from '~~/types/user.type';

// const {name} = useAppConfig()
// const currentUser = useState<CurrentUser>('currentUser')

/**
 * 响应式获得窗口的滚动位置
 */
const {y} = useWindowScroll()
let headerTop = computed(() => {
    return y.value;
})

</script>

<style scoped>
/* @import '~/assets/styles/layouts/default.css'; */
</style>