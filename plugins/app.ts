import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAm57VcSieKjD1uoEuK-YrV4wm8Um0ezNM",
  authDomain: "todolist-9c39f.firebaseapp.com",
  projectId: "todolist-9c39f",
  storageBucket: "todolist-9c39f.appspot.com",
  messagingSenderId: "248738989307",
  appId: "1:248738989307:web:217dad2b21436eb7d0dc5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('firebaseApp', app);
  nuxtApp.vueApp.provide('firebaseApp', app);
})