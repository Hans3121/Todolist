

function searchIndex(index: number[], object: any) {
  let item = object;
  index.forEach((i: any)=>{
    item = item.children[i]
  })
  return item
}

interface Todo {
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
      ]}
    }
  },

  getters: {
    task : (state) => {
      return (index: number[]) => searchIndex(index, state.todoList).task
    },
    childCount : (state) => {
      return (index: number[]) => searchIndex(index, state.todoList).children?.length
    }
  },
  
  actions: {
    editTask(index: number[], newTask: string) {
      let _task:any = searchIndex(index, this.todoList);
      _task.task = newTask
    },
    // Remove Task
    removeTask(index: number[]) {
      let item: Todo = this.todoList;
      let final = index.pop();

      index.forEach((i: any)=>{
        if (item.children){
          item = item.children[i]
        }
      })

      if (final) { item.children?.splice(final, 1); }    
    },
    // AddTask
    addTask(index: number[]) {
      let _task = searchIndex(index, this.todoList);
      if (!_task.children) {
        _task.children = []
      }
      _task.children.push({
        task: "Newly Added Task",
        children: []
      })
    },

    // Export Todo List


    // Import Todo List
  }
})