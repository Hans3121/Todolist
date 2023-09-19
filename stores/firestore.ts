import { getFirestore, collection, setDoc, doc, Firestore, getDoc, connectFirestoreEmulator } from "firebase/firestore"



export const useFirestore = defineStore("firestore", {
  state: ()=>{
    return {
      db: null as Firestore | null
    }
  },
  actions: {
    init() {
      this.db = getFirestore(useNuxtApp().$firebaseApp);
      // connectFirestoreEmulator(this.db, 'localhost', 8080)
    },
    async saveData() {
      let uid = useAuth().user?.uid;
      let data = useTodoList().todoList;

      if (this.db && uid) {
        return setDoc(doc(this.db, 'todoList', uid), {
          data
        }, {
          merge: true
        })
      } 
    },
    async saveSettings() {
      let uid = useAuth().user?.uid;
      let settings = useSettings().settings;

      if (this.db && uid) {
        return setDoc(doc(this.db, 'todoList', uid), {
          settings
        }, {
          merge: true
        })
      } 
    },

    async getData(uid: any) {
      if (this.db) {
        let result = await getDoc(doc(this.db, 'todoList', uid))
          let data = result.data();
          useTodoList().setTask(data?.data);
          useSettings().setSettings(data?.settings);
        
      } 
    },
    
  }
})
