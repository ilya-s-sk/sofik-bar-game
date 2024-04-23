<script lang="ts" setup>
  import { ref } from 'vue';
  import UIButton from '~/components/ui/button/UI-Button.vue';
  import UIDialog from '~/components/ui/dialog/UI-Dialog.vue';
  import LogoutIcon from '~/components/ui/icons/LogoutIcon.vue';
import { storageEntry } from '~/storage';

  const isModalOpen = ref(false);

  const openModal = () => {
    isModalOpen.value = true;
  }

  const logout = () => {
    storageEntry.deleteUserData();
    location.reload();
  }
</script>

<template>
  <UIButton :class="$style.logoutButton" @click="openModal" aria-label="Выйти">
    <LogoutIcon />
  </UIButton>
  <UIDialog :is-show="isModalOpen" @close="() => isModalOpen = false">
    <UIButton theme="red" @click="logout">Выйти</UIButton>
  </UIDialog>
</template>

<style lang="css" src="./index.module.css" module></style>