<script setup lang="ts">

import _uniqueId from 'lodash/uniqueId'
import {Ref} from 'vue'

const todos = defineProps<{
  index?: number[]
}>();

const store = useTodoList(); // TodoList Store

// Template
let index: Ref<number[]>;
if (todos.index) {
  index = ref(todos.index); // Index to reference this task object
} else {
  index = ref([])
}
const task = ref(store.task(index.value)); 
const isCollapsed = ref(false);
const isNotRoot = todos.index? true : false;


// Styles
const colorPallete = [
  "#f87171",
  "#fb923c",
  "#facc15",
  "#a3e635",
  "#4ade80",
  "#22d3ee",
  "#60a5fa",
  "#818cf8",
  "#e879f9",
  "#fb7185",
]

const currentColor = colorPallete[ index.value.length % colorPallete.length ]


function print(str: any) {
  console.log(str);
}

</script>

<template>

  <button v-if="!isNotRoot" class="btn my-8 mx-auto" @click="store.addTask('')">
    Add more Task
  </button>

  <div class="flex flex-col" :class="isNotRoot?'pl-4': 'mr-2 border-r'" >

    <!-- Row -->
    <div class="flex w-full gap-4 border-l-4 border-b pr-3 bg-slate-500" v-if="isNotRoot"
      :style="{
        'border-color' : currentColor
      }">

      <!-- Actual Task -->
      <input type="text" class="border focus:border-black outline-none flex-grow " v-model="task" @change="store.editTask(index, task)">

      <!-- Add Subtask -->
      <button @click="store.addTask(index)" class="font-extrabold text-slate-200" title="Add sub task">
        +
      </button>

      <!-- Toggle Collapsed -->
      <button @click="isCollapsed = !isCollapsed" class="text-slate-200  transition-all" title="Toggle collapsed" 
        :class="isCollapsed?'rotate-90':''"
      >
        <svg 
         xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right " viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>

      <!-- Delete Task and all subtasks -->
      <button @click="store.removeTask(index)" class="font-extrabold text-slate-200" title="Delete task and all subtasks">
        x
      </button>

    </div>

    <!-- SubTask -->
    <div class="flex flex-col " v-if="!isCollapsed">
      <Todo v-for="i in store.childCount(index)" :index="[...index, i-1]" :key="_uniqueId()" />
    </div>

  </div>
</template>

<!--  -->