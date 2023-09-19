
import { Auth, getAuth, User, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { Ref } from "vue";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// const firebaseConfig = {
//   apiKey: "AIzaSyCJs1zKJ8LPtErCwCFD0VY4t8hFzleBa2U",
//   authDomain: "nuxt-firebase-learning.firebaseapp.com",
//   projectId: "nuxt-firebase-learning",
//   storageBucket: "nuxt-firebase-learning.appspot.com",
//   messagingSenderId: "859878430221",
//   appId: "1:859878430221:web:1152551b6bbc7b29e6a744",
//   measurementId: "G-C82TE6EWMW"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


export const useAuth = defineStore("user", ()=>{
  const app = useNuxtApp().$firebaseApp // Test this out
  let _auth: Auth;
  const user: Ref<User | null> = ref(null);

  function init(){
    _auth = getAuth(app);

    _auth.onAuthStateChanged(async (data)=>{
      user.value = data;
      if (data) {
        if (useRoute().path == "/") {
          navigateTo("/todoList");
        }

        // Get Firestore Data
        useFirestore().getData(data.uid)
      } else {
        navigateTo("/");
      }
    });

  }

  async function signIn(callback: Function | null){
    await signInWithPopup(_auth, new GoogleAuthProvider())
    const result = await getRedirectResult(_auth);
    if (result) {
      if (callback) { callback() }
    }
      
  }
  // Add new sign in methods

  function signOut(){
    _auth.signOut();
  }

  const isLoggedIn = computed(()=>{return user.value != null})

  return {app, user, isLoggedIn, init, signIn, signOut}
})