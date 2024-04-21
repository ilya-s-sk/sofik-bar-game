<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useSofikStore } from '~/store/sofik';
import UserItem from './user-item/UserItem.vue';

const sofikStore = useSofikStore();

onBeforeMount(async () => {
  await sofikStore.getUsers();
  // вызываем апишку
  // 
})
</script>

<template>
  <p>Софик, с днём рождения! <span :class="$style.heart">💙</span></p>
  <h1 :class="$style.title">Игроки:</h1>
  <ul :class="$style.list">
    <li v-for="user in sofikStore.users" :key="user.id" :class="$style.listItem">
      <UserItem :user-data="user" />
    </li>
  </ul>
</template>

<style lang="css" src="./index.module.css" module></style>