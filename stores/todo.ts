import { Todo } from "~~/.nuxt/components";


function searchIndex(index: number[] | Todo, object?: any, print: boolean = false) : Todo {
  if (Array.isArray(index)) {
    let item = object;
    // if (print){console.log('calc')};
    index.forEach((i: any)=>{
      item = item.children[i]
    })
    return item
  } else {
    // console.log("is a Todo")
    return index
  }
  
}

export interface Todo {
  children?: Todo[],
  collapse?: boolean,
  task?: string
}

// Data structure of todo list : 
// children : [{
//  task: "do Something",
//  children: [{
//    task: "Do something's child"
//  }]
// },{
//  task: " Do some other thing"
// }]

export const useTodoList = defineStore('todo', {
  state: () => {
    return {
      todoList : {
        children: [{
          task: "Loading todolist",
        }
      ]} as Todo
    }
  },

  getters: {
    taskObject : (state) =>{
      return (index: number[] | Todo, print?: boolean) => searchIndex(index, state.todoList, print)
    },
    task : (state) => {
      return (index: number[] | Todo) => searchIndex(index, state.todoList).task
    },
    childCount : (state) => {
      return (index: number[] | Todo) => searchIndex(index, state.todoList).children?.length
    },
    collapse : (state) =>{
      return (index: number[] | Todo) => searchIndex(index, state.todoList).collapse
    }
    
  },
  
  actions: {
    editTask(index: number[] | Todo, newTask: string) {
      let _task:any = searchIndex(index, this.todoList);
      _task.task = newTask
    },
    // Remove Task
    removeTask(index: number[]) {
      let final = index.pop();
      let task = searchIndex(index, this.todoList);
      if (final != undefined) { 
        task.children?.splice(final, 1);
      }    
    },
    // AddTask
    addTask(index: number[] | Todo) {
      let _task = searchIndex(index, this.todoList);
      if (!_task.children) {
        _task.children = []
      }
      _task.children.push({
        task: "Newly Added Task",
        children: []
      })
    },
    toggleCollapse(index: number[] | Todo) {
      let task = searchIndex(index, this.todoList);
      task.collapse = !task.collapse
    },
    // Export Todo List


    // Import Todo List
  }
})