<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useAdminStore } from '~/store/admin';
import UserItem from './user-item/UserItem.vue';

const adminStore = useAdminStore();

onBeforeMount(async () => {
  await adminStore.getUsers();
})
</script>

<template>
  <h1 :class="$style.title">Админ панель</h1>
  <ul>
    <li v-for="user in adminStore.users" :key="user.id" :class="$style.userBlock">
      <UserItem :user />
    </li>
  </ul>
</template>

<style lang="css" src="./index.module.css" module></style>