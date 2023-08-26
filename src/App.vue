<template>
  <header>
    <div>
      <nav>
        <RouterLink v-if="userStore.user" to="/">Home</RouterLink>
        <RouterLink v-if="userStore.user" to="/secret">Secret</RouterLink>
        <RouterLink v-if="!userStore.user" to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <div>
    <RouterView />
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();
</script>
