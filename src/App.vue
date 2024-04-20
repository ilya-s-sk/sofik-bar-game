<script setup lang="ts">
import { onBeforeMount } from "vue";
import Login from "~/components/login/Login.vue";
import Game from '~/components/game/Game.vue';
import { IUserData } from "~/types";
import { storageEntry } from "~/storage/index";
import { useStore } from '~/store';

const store = useStore();

useStore().$subscribe((_, state) => {
  storageEntry.setUserData(state.userData);
  storageEntry.setTasksList(state.tasksList);
  storageEntry.setCurrentBarName(state.currentBarName);
})

const setUserData = (userData: IUserData) => {
  store.setUserData(userData);
  storageEntry.setUserData(userData);
};

onBeforeMount(() => {
  // Достаём данные, сохраненные в localStorage
  const storedData: { data: unknown, field: keyof typeof store.$state }[] = [
    { data: storageEntry.getUserData(), field: 'userData' },
    { data: storageEntry.getTasksList(), field: 'tasksList' },
    { data: storageEntry.getCurrentBarName(), field: 'currentBarName' },
  ];
  storedData.forEach(data => {
    if (!data.data) return;

    store[data.field] = data.data as any; // TODO fix
  });
})
</script>

<template>
  <main :class="$style.main">
    <Login v-if="!store.hasUserData" @set-user-data="setUserData" />
    <Game v-else />
  </main>
</template>

<style lang="css" module src="./app.module.css"></style>
