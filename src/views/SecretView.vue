<script setup>
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();
</script>

<template>
  <div class="about">
    <h1>This is protected content</h1>
    <p v-if="userStore.user" class="session">
      Account: {{ userStore.user.email }}
    </p>
  </div>
</template>
