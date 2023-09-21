<template>
  <div class="h-full w-full my-0 mx-10 flex items-center">
    <header class="flex w-full h-full items-center">
      <a href="/" class="h-10 block">
        <div class="h-full w-20 flex items-center">
          <span
            class="tl_icon h-10 leading-10 w-full text-center font-bold text-xl relative"
            style="top: -100px"
            >{{ name }}</span
          >
        </div>
      </a>
      <nav class="block flex-1">
        <div class="flex h-full items-center pl-8">
          <div
            class="ml-5 h-10 relative leading-10 hover:cursor-pointer hover:text-blue-400 sm:visible invisible"
            :class="{ nav_chosed: nav_now === '/' }"
          >
            <span
              class="navitem text-lg text-center font-extralight"
              @click="router.push({ path: '/' })"
              >首页</span
            >
          </div>
          <div
            class="ml-5 h-10 relative leading-10 hover:cursor-pointer hover:text-blue-400 sm:visible invisible"
            :class="{ nav_chosed: nav_now === '/about' }"
          >
            <span
              class="navitem text-lg text-center font-extralight"
              @click="router.push({ path: '/about' })"
              >关于</span
            >
          </div>
        </div>
      </nav>
      <div class="h-20 w-60 flex items-center justify-around">
        <div
          class="ml-5 h-10 relative leading-10 hover:cursor-pointer hover:text-blue-400 xs:visible invisible"
          :class="{ nav_chosed: nav_now === '/posts' }"
        >
          <span
            class="navitem text-lg text-center font-extralight"
            @click="router.push({ path: '/write' })"
            >写文章</span
          >
        </div>
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-300 hover:cursor-pointer"
          @click="router.push({ path: '/user' })"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#FBEAFF"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
const router = useRouter();
const route = useRoute();
const { name } = useAppConfig();
let nav_now = computed(() => {
  return route.path;
});

onMounted(() => {
  let tl = gsap.timeline();
  tl.to('.tl_icon', { duration: 1, y: 100 }, '<');
});
</script>

<style scoped>
.nav_chosed {
  font-weight: 500;
  color: rgb(70, 151, 192);
}

.nav_chosed:hover {
  color: black;
}

.navitem::before {
  content: '';
  position: absolute;
  width: 40px;
  height: 2px;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 1px;
  visibility: hidden;
  background-color: rgb(70, 151, 192);
}

.navitem:hover::before {
  visibility: visible;
}
</style>
