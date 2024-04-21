<script setup lang="ts">
import { onBeforeMount } from "vue";
import Login from "~/components/login/Login.vue";
import Game from '~/components/game/Game.vue';
import UIDialog from "./components/ui/dialog/UI-Dialog.vue";
import { storageEntry } from "~/storage";
import { useUserStore } from '~/store/user';
import { useDialogStore } from '~/store/dialog';

const store = useUserStore();
const dialogStore = useDialogStore();

useUserStore().$subscribe((_, state) => {
  [
    { state: state.userData, action: storageEntry.setUserData.bind(storageEntry) },
    { state: state.tasksList, action: storageEntry.setTasksList.bind(storageEntry) },
    { state: state.currentBarName, action: storageEntry.setCurrentBarName.bind(storageEntry) },
  ].forEach(item => {
    item.action(item.state as any) // TODO fix type
  });
});

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
    <Login v-if="!store.hasUserData" />
    <Game v-else />

    <UIDialog
      :is-show="dialogStore.isShow"
      :show-error="dialogStore.isErrorShow"
      :error-text="dialogStore.errorContent"
      @close="() => dialogStore.closeDialog()"
    >
      <div v-html="dialogStore.content"></div>
    </UIDialog>
  </main>
</template>

<style lang="css" module src="./app.module.css"></style>
