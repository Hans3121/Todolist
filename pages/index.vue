<script setup>
const auth = useAuth();

</script>

<template>
 <div class="flex flex-col items-center justify-center h-screen">
    <button class="button" @click="auth.signIn">Log In with Google</button>
 </div>
</template>

<style>

</style>