import { initializeApp } from "firebase/app";


// Initialize Firebase

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.apiKey,
    authDomain: config.public.authDomain,
    projectId: config.public.projectId,
    storageBucket: config.public.storageBucket,
    messagingSenderId: config.public.messagingSenderId,
    appId: config.public.appId
  };
  const app = initializeApp(firebaseConfig);
  nuxtApp.provide('firebaseApp', app);
  nuxtApp.vueApp.provide('firebaseApp', app);
})