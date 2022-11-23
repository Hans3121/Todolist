<script setup>
const auth = useAuth();

</script>

<template>
 <div class="flex flex-col items-center">
    <button class="btn btn-primary" @click="auth.signIn">Log In</button>
 </div>
</template>

<style>

</style>