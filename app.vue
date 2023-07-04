<template>
  <n-config-provider preflight-style-disabled>
    <n-message-provider>
      <n-dialog-provider>
        <NuxtLayout :name="layout_name">
          <NuxtPage />
        </NuxtLayout>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
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
  
  // const currentUserFromStorage = useLocalStorage('currentUser')
  // console.log(currentUserFromStorage,'////')

  // if(currentUserFromStorage) {
  //   const currentUser = useState('currentUser')
  //   currentUser.value = currentUserFromStorage
  // }
})
</script>

<style>
@import '~/assets/styles/main.css';
</style>
