<script setup>

let firestore = useFirestore();
let todoList = useTodoList();
let undo = useTodoUndo();
let isSaving = ref(false);

function saveData() {
  isSaving.value = true;
  firestore.saveData()
    .then(()=>{
      isSaving.value = false;
      todoList.hasChanges = false;
    })
}

// Warning if leave before saving, doesn't account for undos
onMounted(()=>{
  window.addEventListener('beforeunload', ev=>{
    if (todoList.hasUnsavedData) {
      ev.preventDefault();
      return ev.returnValue = "Are you sure you want to exit?"
    }
  })
})
</script>

<template>

  <NuxtLayout>
    <!-- Add UNDO REDO -->
    <button class="button my-8 mx-auto" @click="undo.undo()">
      Undo
    </button>

    <button class="button mb-8 mx-auto" @click="todoList.addTask([])">
      Add more Task
    </button>

    <Todo class=" mt-4 w-full" :index="[]"/>

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

    <div v-if="todoList.hasUnsavedData">
      Has Unsaved Data
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