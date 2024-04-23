<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import Login from "~/components/login/Login.vue";
import Game from '~/components/game/Game.vue';
import UIDialog from "./components/ui/dialog/UI-Dialog.vue";
import Admin from "./components/admin/Admin.vue";
import { storageEntry } from "~/storage";
import { useUserStore } from '~/store/user';
import { useDialogStore } from '~/store/dialog';

const store = useUserStore();
const dialogStore = useDialogStore();

const pending = ref(false);

const isAdmin = ref(false);

onBeforeMount(async () => {

  const query = window.location.search;

  if (query === '?super_turbo_gay_admin=da') {
    isAdmin.value = true;
    return;
  }

  useUserStore().$subscribe((_, state) => {
    [
      { state: state.userData, action: storageEntry.setUserData.bind(storageEntry) },
      { state: state.gameOptions, action: storageEntry.setGameOptions.bind(storageEntry) },
      { state: state.tasksList, action: storageEntry.setTasksList.bind(storageEntry) },
      { state: state.currentBarName, action: storageEntry.setCurrentBarName.bind(storageEntry) },
    ].forEach(item => {
      item.action(item.state as any) // TODO fix type
    });
  });

  // Достаём данные, сохраненные в localStorage
  const storedData: { data: unknown, field: keyof typeof store.$state }[] = [
    { data: storageEntry.getUserData(), field: 'userData' },
    { data: storageEntry.getTasksList(), field: 'tasksList' },
    { data: storageEntry.getCurrentBarName(), field: 'currentBarName' },
    { data: storageEntry.getGameOptions(), field: 'gameOptions' },
  ];
  storedData.forEach(data => {
    if (!data.data) return;

    store[data.field] = data.data as any; // TODO fix type
  });

  pending.value = true;
  await store.getUserData();
  pending.value = false;
})
</script>

<template>
  <main :class="$style.main">
    <Admin v-if="isAdmin" />
    
    <template v-else>
      <h1 v-if="pending">Загрузка...</h1>
      <Login v-else-if="!store.hasUserData" />
      <Game v-else />
    </template>

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
