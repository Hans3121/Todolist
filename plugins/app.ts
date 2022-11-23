import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCJs1zKJ8LPtErCwCFD0VY4t8hFzleBa2U",
  authDomain: "nuxt-firebase-learning.firebaseapp.com",
  projectId: "nuxt-firebase-learning",
  storageBucket: "nuxt-firebase-learning.appspot.com",
  messagingSenderId: "859878430221",
  appId: "1:859878430221:web:1152551b6bbc7b29e6a744",
  measurementId: "G-C82TE6EWMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('firebaseApp', app);
  nuxtApp.vueApp.provide('firebaseApp', app);
})