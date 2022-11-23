import { useAuth } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) =>{


  const store = useAuth();
  if(to.path != "/" && !store.isLoggedIn && false) {
      return navigateTo("/")
    }
  
})