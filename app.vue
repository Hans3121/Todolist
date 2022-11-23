<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
let store = useAuth();
let firestore = useFirestore();
onMounted(()=>{
  store.init();
  firestore.init();
})
</script>