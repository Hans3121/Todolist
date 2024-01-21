// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }],
    '@nuxtjs/tailwindcss'
  ],
  imports: {
    dirs: ['stores'],
  
  }, 
  vue: {
    compilerOptions: {
      
    }
  },
  css: [   
    "@/assets/css/global.css"
  ],
  runtimeConfig: {
    public: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    }
  }
})
