<script setup>

let auth = useAuth();
let firestore = useFirestore();
let todolist = useTodoList();

let isSaving = ref(false);

function saveData() {
  isSaving.value = true;
  firestore.saveData()
    .then(()=>{
      isSaving.value = false;
    })
}
</script>

<template>

  <NuxtLayout>
    <div class="flex flex-col items-stretch w-full">
      <Todo class=" mt-4 w-full" :index="[]"/>
    </div>

    <button class="button m-8 mb-2" @click="saveData">
      Save
    </button>

    <div v-if="isSaving" class="flex gap-2 ml-8">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Saving
    </div>

    

  </NuxtLayout>
  
</template>

<!-- 
  ToDo :
  1. Create a todo list here
    - Half okay i guess, try to store the todo list on pinia next time!
  2. set up a firestore store
  3. link todo list with firestore with manual save (save api storage)
 -->