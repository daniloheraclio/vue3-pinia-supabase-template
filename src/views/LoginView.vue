<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../clients/supabase";

const router = useRouter();

let email = ref("");
let password = ref("");
let firstName = ref("");

async function loginWithSocialProvider(provider) {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { skipBrowserRedirect: false },
  });
  if (error) throw error;
  return user;
}

async function createAccount() {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: firstName.value,
      },
    },
  });
  if (error) {
    console.log(error);
  } else {
    router.push({ path: "/" });
  }
}

async function login() {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.log(error);
  } else {
    router.push({ path: "/" });
  }
}
</script>

<template>
  <h1>Login</h1>
  <div>
    <label for="email"> Email: </label>
    <input type="email" id="email" v-model="email" />
  </div>

  <div>
    <label for="email"> Password: </label>
    <input type="password" id="password" v-model="password" />
  </div>

  <div>
    <label for="firstName"> First Name </label>
    <input type="firstName" id="firstName" v-model="firstName" />
  </div>

  <div>
    <button @click="createAccount">Create</button>
    <button @click="login">Login</button>
    <button @click="loginWithSocialProvider('google')">Google</button>
  </div>
</template>
