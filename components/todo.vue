<script setup lang="ts">
//Prep
import _uniqueId from "lodash/uniqueId";
const props = defineProps<{
  index: number[];
}>();

// Script
const store = useTodoList();

// Template
// For numbers index
// let index = ref(props.index); // Index to reference this task object

// Using taskobject references
const taskObject = ref(store.taskObject(props.index));
const task = ref(store.task(taskObject.value));
const isNotRoot = props.index.length != 0;

// Styles

const currentColor = useSettings().getColor(props.index);
const textColor = useSettings().getTextColor(props.index);

function print(str: any) {
  console.log(str);
}
</script>

<template>
  <button v-if="!isNotRoot" class="button my-8 mx-auto" @click="store.addTask([])">
    Add more Task
  </button>

  <div class="flex flex-col" :class="isNotRoot ? 'pl-4' : 'mr-2 border-r'">
    <!-- Row -->
    <div class="flex w-full pl-4 py-1 pr-3 " v-if="isNotRoot" :style="{ backgroundColor: currentColor }">
      <!-- Actual Task -->
      <input type="text" v-model="task" @focusout="store.editTask(taskObject, task ? task : '')"
        class=" outline-none flex-grow focus:border m-[1px] focus:m-0"
        :style="{ color: textColor, backgroundColor: currentColor, borderColor: textColor }" />

      <div class="flex items-center pl-2 gap-2 w-24"
        :style='{ color: currentColor, backgroundColor: textColor }'>
        <!-- Add Subtask -->
        <button @click="store.addTask(taskObject)" class="font-extrabold button-icon w-fit" title="Add sub task">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        </button>

        
        <!-- Delete Task and all subtasks -->
        <button @click="store.removeTask(props.index)" class="font-extrabold button-icon"
        title="Delete task and all subtasks">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24">
            <path fill="currentColor"
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>

        <!-- Toggle Collapsed -->
        <button v-if="store.childCount(props.index)" @click="store.toggleCollapse(taskObject)" class="transition-all button-icon-chevron" title="Toggle collapsed"
          :class="store.collapse(taskObject) ? 'rotate-90' : ''">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
      
    </div>

    <!-- SubTask -->
    <div class="flex flex-col" v-if="!store.collapse(taskObject)">
      <Todo v-for="i in store.childCount(props.index)" :index="[...props.index, i - 1]" :key="_uniqueId()" />
    </div>
  </div>
</template>

<style>
  .button-icon:hover, .button-icon:focus {
    transform: rotate(15deg);
    transition: transform 0.3s ease;
  }
  .button-icon-chevron:hover, .button-icon-chevron:focus {
    position: relative;
    top: -2px;
    transition: all 0.3s ease;
  }
</style>

<!--  -->
