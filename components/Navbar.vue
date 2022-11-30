<template>
  <div class="w-full h-16 bg-green-300 px-4 py-2 flex justify-between items-center border-b-2 border-black">
    <!-- Hello User___ -->
    <h1>Hello {{useAuth().user?.displayName}}</h1>

    <!-- Create button to open settings
      Set Text color and Background color, maybe use another page
      Add a button to revert to defaults
    
    -->
    <div class="flex gap-2">
      <NuxtLink to="/settings" class="button">Settings</NuxtLink>
      <!-- Log Out Button -->
      <button @click="useAuth().signOut" class="button">Log Out</button>
    </div>
  </div>
</template>