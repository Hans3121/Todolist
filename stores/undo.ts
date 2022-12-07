

export const useTodoUndo = defineStore('Undo', ()=>{
    const undoList = [] as Function[]

    function undo() {
        
        let fn = undoList.pop()
        if (fn) {
            fn()
        }  
    }

    function addUndo(fn: Function) {

        undoList.push(fn)
    }

    return {
        undoList,
        addUndo,
        undo
    }
})