<script setup lang="ts">
import { onBeforeMount } from "vue";
import Login from "~/components/login/Login.vue";
import Game from '~/components/game/Game.vue';
import { IUserData } from "~/types";
import { storageEntry } from "~/storage/index";
import { useStore } from '~/store';

const store = useStore();

const setUserData = (userData: IUserData) => {
  store.setUserData(userData);
  storageEntry.setUserData(userData);
};

onBeforeMount(() => {
  const storedUserData = storageEntry.getUserData();
  if (!storedUserData) {
    return;
  }
  store.setUserData(storedUserData);
})
</script>

<template>
  <main :class="$style.main">
    <Login v-if="!store.hasUserData" @set-user-data="setUserData" />
    <Game v-else />
  </main>
</template>

<style lang="css" module src="./app.module.css"></style>
