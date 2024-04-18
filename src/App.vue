<script setup lang="ts">
import Login from "./components/login/Login.vue";
import { IUserData } from "./types";
import { storageEntry } from "./storage/index";
import { onMounted } from "vue";
import { useStore } from './store';

const store = useStore();

const getUserData = (userData: IUserData) => {
  store.setUserData(userData);
  storageEntry.setUserData(userData);
};

onMounted(() => {
  const storedUserData = storageEntry.getUserData();
  if (!storedUserData) {
    return;
  }
  store.setUserData(storedUserData);
})
</script>

<template>
  <main :class="$style.main">
    <Login v-if="!store.hasUserData" @set-user-data="getUserData" />
  </main>
</template>

<style lang="css" module src="./app.module.css"></style>
