<script setup lang="ts">
import { onBeforeMount } from "vue";
import Login from "~/components/login/Login.vue";
import Game from '~/components/game/Game.vue';
import { IUserData } from "~/types";
import { storageEntry } from "~/storage";
import { useStore } from '~/store';

const store = useStore();

useStore().$subscribe((_, state) => {
  [
    { state: state.userData, action: storageEntry.setUserData.bind(storageEntry) },
    { state: state.tasksList, action: storageEntry.setTasksList.bind(storageEntry) },
    { state: state.currentBarName, action: storageEntry.setCurrentBarName.bind(storageEntry) },
  ].forEach(item => {
    item.action(item.state as any) // TODO fix type
  });
})

const setUserData = (userData: IUserData) => {
  store.setUserData(userData);
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

    store[data.field] = data.data as any; // TODO fix type
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
