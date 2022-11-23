<template>
  <div class="w-full h-16 bg-green-300 px-4 py-2 flex justify-between items-center border-b-2 border-black">
    <!-- Hello User___ -->
    <h1>Hello {{useAuth().user?.displayName}}</h1>

    <!-- Log Out Button -->
    <button @click="useAuth().signOut" class="btn btn-warning">Log Out</button>
  </div>
</template>