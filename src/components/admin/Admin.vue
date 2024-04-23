<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useAdminStore } from '~/store/admin';
import UserItem from './user-item/UserItem.vue';
import UIButton from '../ui/button/UI-Button.vue';

const adminStore = useAdminStore();

const pending = ref(false);

const forceNextCircle = async () => {
  pending.value = true;
  await adminStore.forceNextCircle()
  pending.value = false;
}

onBeforeMount(async () => {
  pending.value = true;
  await adminStore.getUsers();
  pending.value = false;
})
</script>

<template>
  <h1 :class="$style.title">Админ панель</h1>
  <div :class="$style.actionsBlock">
    <UIButton :loading="pending" @click="forceNextCircle">Перевести всех на следующий круг</UIButton>
  </div>
  <ul>
    <li v-for="user in adminStore.users" :key="user.id" :class="$style.userBlock">
      <UserItem :user />
    </li>
  </ul>
</template>

<style lang="css" src="./index.module.css" module></style>