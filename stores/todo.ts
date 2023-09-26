

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

interface Todo {
  children?: Todo[],
  collapse?: boolean,
  task?: string
}

export const useTodoList = defineStore('todo', {
  state: () => {
    return {
      todoList : {
        children: [{
          task: "Loading todolist",
        }
      ]} as Todo,
      hasChanges : false
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
      return (index: number[] | Todo) => searchIndex(index, state.todoList)?.children?.length
    },
    collapse : (state) =>{
      return (index: number[] | Todo) => searchIndex(index, state.todoList).collapse
    },
    hasUnsavedData : (state)=>{
      return (state.hasChanges && useTodoUndo().undoList.length > 0)
    }
    
  },
  
  actions: {
    // Setup
    setTask(todoList : Todo | null) {
      if (todoList) {
        this.todoList = todoList
      } else {
        this.todoList = {
          children: [{
            task: "Enter your task here",
            children: [{
              task: "And add subtasks here"
            }]
          }]
        }
      }
    },

    // Mutations
    editTask(index: number[] | Todo, newTask: string, doUndo = true) {

      // Get Task
      let task:any = searchIndex(index, this.todoList);
      let oldTask = task.task;
      task.task = newTask;

      // Push Undo
      if (doUndo && oldTask != newTask) {
        useTodoUndo().addUndo(()=>{
          this.editTask(index, oldTask, false);
        })
      }
      this.hasChanges = true;
    },
    removeTask(index: number[]) {
      // Get parent Todo
      let final = index.pop();
      let task = searchIndex(index, this.todoList);

      if (final != undefined) { 
        // Remove
        let removedTask = task.children?.splice(final, 1);

        // Push Todo Command
        useTodoUndo().addUndo(()=>{
            if (final != undefined && removedTask) {
              task.children?.splice(final, 0, removedTask[0]);
            }
        })
      }    
      this.hasChanges = true;
    },
    addTask(index: number[] | Todo) {
      // Getting task.children
      let task = searchIndex(index, this.todoList);
      if (!task.children) {task.children = []}

      // Modify
      task.children.push({
        task: "Newly Added Task",
        children: []
      })

      // Add Undo 
      useTodoUndo().addUndo(()=>{
        task.children?.pop()
      });
      this.hasChanges = true;
    },
    toggleCollapse(index: number[] | Todo) {
      let task = searchIndex(index, this.todoList);
      task.collapse = !task.collapse;

      //Undo
      useTodoUndo().addUndo(()=>{
        task.collapse = !task.collapse
      });

      this.hasChanges = true
    },

    // Export Todo List
    
    
    // Import Todo List
  }
})

