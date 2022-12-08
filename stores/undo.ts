

// export const useTodoUndo = defineStore('Undo', ()=>{
//     const undoList = [] as Function[]

//     function undo() {
        
//         let fn = undoList.pop()
//         if (fn) {
//             fn()
//         }  
//     }
//     function addUndo(fn: Function) {
//         undoList.push(fn)
//     }
//     return {
//         undoList,
//         addUndo,
//         undo
//     }
// })

export const useTodoUndo = defineStore('UndoV2', {
    state: ()=>{
        return {
            undoList: [] as Function[]
        }
    },
    actions: {
        addUndo(fn: Function) {
            this.undoList.push(fn)
        },
        undo(){
            let fn = this.undoList.pop();
            if (fn) {fn()}
        }
    }
  })