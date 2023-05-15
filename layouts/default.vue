<template>
    <div class="app">
        <header>
            <div>
                <span></span>
                <NuxtLink to="/">{{ name }}</NuxtLink>
            </div>
            <nav>
                <div>
                    <NuxtLink to="/about">关于</NuxtLink>
                </div>
                <div>
                    <NuxtLink to="/posts">内容</NuxtLink>
                </div>
            </nav>
            <div>
                <div v-if="!currentUser">
                    <NuxtLink to="/login">
                        <img src="/icons/account.svg" alt="登录" />
                    </NuxtLink>
                </div>
                <div v-else>
                    <img src="/icons/logout.svg" alt="退出登录" @click="useLogout" />
                </div>
                <div v-if="currentUser">{{ currentUser.name }}</div>
            </div>
        </header>
        <main>
            <slot></slot>
        </main>
    </div>
</template>

<script setup lang="ts">
import type { CurrentUser } from '~~/types/user.type';

const {name} = useAppConfig()
const currentUser = useState<CurrentUser>('currentUser')

</script>

<style scoped>
/* @import '~/assets/styles/default.css'; */
@import '~/assets/styles/main.css';


</style>