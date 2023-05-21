<template>
  <div>
      <NuxtPage />
  </div>
</template>

<script setup lang="ts">

const layout = 'user-manage'

// definePageMeta({
//   layout: false,
// });

const {name} = useAppConfig()
console.log(name)

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
