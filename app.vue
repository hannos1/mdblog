<template>
    <NuxtLayout :name="layout_name">
      <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()  // 当前路由

const {name} = useAppConfig() // 项目名称

// 布局类型名
let layout_name = computed(() => {
    return useLayoutType(route.path)
})

// 统一设置title的地方
useHead({
  titleTemplate(title){
    return title ? `${title} - ${name}` : name;
  }
})

onMounted(()=> {

  const currentUserFromStorage = useLocalStorage('currentUser')
  console.log(currentUserFromStorage,'////')

  if(currentUserFromStorage) {
    const currentUser = useState('currentUser')
    currentUser.value = currentUserFromStorage
  }
})
</script>

<style>
@import '~/assets/styles/main.css';
</style>
