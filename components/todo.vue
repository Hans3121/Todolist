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
];
const currentColor = colorPallete[props.index.length % colorPallete.length];

function print(str: any) {
  console.log(str);
}
</script>

<template>
  <button v-if="!isNotRoot" class="btn my-8 mx-auto" @click="store.addTask([])">
    Add more Task
  </button>

  <div class="flex flex-col" :class="isNotRoot ? 'pl-4' : 'mr-2 border-r'">
    <!-- Row -->
    <div
      class="flex w-full gap-4 border-l-4 border-b pr-3 bg-slate-500"
      v-if="isNotRoot"
      :style="{ 'border-color': currentColor }"
    >
      <!-- Actual Task -->
      <input
        type="text"
        v-model="task"
        @change="store.editTask(taskObject, task ? task : '')"
        class="border focus:border-black outline-none flex-grow"
      />

      <!-- Add Subtask -->
      <button
        @click="store.addTask(taskObject)"
        class="font-extrabold text-slate-200"
        title="Add sub task"
      >
        +
      </button>

      <!-- Toggle Collapsed -->
      <button
        @click="store.toggleCollapse(taskObject)"
        class="text-slate-200 transition-all"
        title="Toggle collapsed"
        :class="store.collapse(taskObject) ? 'rotate-90' : ''"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>

      <!-- Delete Task and all subtasks -->
      <button
        @click="store.removeTask(props.index)"
        class="font-extrabold text-slate-200"
        title="Delete task and all subtasks"
      >
        x
      </button>
    </div>

    <!-- SubTask -->
    <div class="flex flex-col" v-if="!store.collapse(taskObject)">
      <Todo
        v-for="i in store.childCount(props.index)"
        :index="[...props.index, i - 1]"
        :key="_uniqueId()"
      />
    </div>
  </div>
</template>

<!--  -->
