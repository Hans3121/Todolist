import { useAuth } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) =>{
  let leave = window.confirm("Leave Site?");
  if (!leave) {
    return abortNavigation()
  }
})