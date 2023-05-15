<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">

// nuxt 内置的hooks函数
const {name} = useAppConfig()
console.log(name)
// 统一设置title的地方
useHead({
  titleTemplate(title){
    return title ? `${title} - ${name}` : name;
  }
})

// onMounted 不用引入
// useState 是nuxt 内置的hooks 类react
// useLocalStorage 
onMounted(()=> {
  const currentUserFromStorage = useLocalStorage('currentUser')
  console.log(currentUserFromStorage,'////')

  if(currentUserFromStorage) {
    const currentUser = useState('currentUser')
    currentUser.value = currentUserFromStorage
  }
})
</script>
