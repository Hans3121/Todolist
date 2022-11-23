

function searchIndex(index: string, object: any) {
  let item = object;
  index.split('').forEach((i: any)=>{
    item = item.children[i]
  })
  return item
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
      return (index: string) => searchIndex(index, state.todoList).task
    },
    childCount : (state) => {
      return (index: string) => searchIndex(index, state.todoList).children?.length
    }
  },
  
  actions: {
    editTask(index: string, newTask: string) {
      let _task:any = searchIndex(index, this.todoList);
      _task.task = newTask
    },
    // Remove Task
    removeTask(index: string) {
      let item:any = this.todoList;
      let indexList = index.split("");
      let final:any = indexList.pop();

      indexList.forEach((i: any)=>{
        item = item.children[i]
      })

      item.children.splice(final, 1);
    },
    // AddTask
    addTask(index: string) {
      let _task:any = searchIndex(index, this.todoList);
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