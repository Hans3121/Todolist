import { getFirestore, collection, setDoc, doc, Firestore, getDoc, connectFirestoreEmulator } from "firebase/firestore"
import { compileScript } from "vue/compiler-sfc";


export const useFirestore = defineStore("firestore", {
  state: ()=>{
    return {
      db: null as Firestore | null
    }
  },
  actions: {
    init() {
      this.db = getFirestore(useNuxtApp().$firebaseApp);
      connectFirestoreEmulator(this.db, 'localhost', 8080)
    },

    async saveData(uid: any, data:any) {
      if (this.db) {
        return setDoc(doc(this.db, 'todoList', uid), {
          data
        }, {
          merge: true
        })

        
      } 
    },

    async getData(uid: any) {
      if (this.db) {
        let result = await getDoc(doc(this.db, 'todoList', uid))
        if (result.exists()) {
          // console.log("Document data:", result.data());
          return result.data()

        } else {
          // console.log("No Such Document!");
          return {
            data: {
              children: [{

              }]
            }
          }

        }
      } 
    }
    
  }
})

// export const useTodoList = defineStore('todo', {
//   state: () => {
//     return {
//       todoList : {
//         children: [{
//           task: "Finish this project",
//           children: [{
//               task: "Integrate this project with Firebase and create save button"
//             },{
//               task: "On Login, get the saved todoList from firestore ah fuck"
//             }]
//         }, {
//           task: "Task 2"
//         }, {
//           task: "Another cryptic task"
//         }
//       ]}
//     }
//   },

//   getters: {
//     task : (state) => {
//       return (index: string) => searchIndex(index, state.todoList).task
//     },
//     childCount : (state) => {
//       return (index: string) => searchIndex(index, state.todoList).children?.length
//     }
//   },
  
//   actions: {
//     editTask(index: string, newTask: string) {
//       let _task:any = searchIndex(index, this.todoList);
//       _task.task = newTask
//     },
//     // Remove Task
//     removeTask(index: string) {
//       let item:any = this.todoList;
//       let indexList = index.split("");
//       let final:any = indexList.pop();

//       indexList.forEach((i: any)=>{
//         item = item.children[i]
//       })

//       item.children.splice(final, 1);
//     },
//     // AddTask
//     addTask(index: string) {
//       let _task:any = searchIndex(index, this.todoList);
//       if (!_task.children) {
//         _task.children = []
//       }
//       console.log(_task);

//       _task.children.push({
//         task: "New Added Task from index " + index,
//         children: []
//       })
//     },

//     // Export Todo List

    
//     // Import Todo List
//   }
// })