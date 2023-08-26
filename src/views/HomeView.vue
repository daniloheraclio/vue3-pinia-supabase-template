<script setup>
import { supabase } from "../clients/supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";

const router = useRouter();
const userStore = useUserStore();

async function logout() {
  const { error } = await supabase.auth.signOut();

  userStore.user = null;
  router.push({ name: "login" });

  if (error) {
    console.log(error);
  } else {
    console.log("Sign out success");
  }
}
</script>

<template>
  <h1>Home Page</h1>

  <button @click="logout">Logout</button>
</template>
