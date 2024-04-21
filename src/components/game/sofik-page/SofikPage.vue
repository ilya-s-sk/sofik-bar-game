<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import RefreshIcon from '~/components/ui/icons/RefreshIcon.vue'; 
import { useSofikStore } from '~/store/sofik';
import { IChangeScoreOptions } from '~/types';
import UserItem from './user-item/UserItem.vue';

const sofikStore = useSofikStore();
const isPending = ref(false);

const changeUserScore = async (id: number, options: IChangeScoreOptions) => {
  isPending.value = true;
  await sofikStore.changeUserScore(id, options);
  isPending.value = false;
}

const update = async () => {
  isPending.value = true;
  await sofikStore.getUsers();
  isPending.value = false;
}

onBeforeMount(async () => {
  await sofikStore.getUsers();
})
</script>

<template>
  <div :class="$style.header">
    <p>Софик, с днём рождения! <span :class="$style.heart">💙</span></p>
    <button :class="$style.refresh" aria-label="Обновить" @click="update"><RefreshIcon /></button>
  </div>
  <h1 :class="$style.title">Игроки:</h1>
  <ul :class="$style.list">
    <li v-for="user in sofikStore.users" :key="user.id" :class="$style.listItem">
      <UserItem
        :user-data="user"
        :pending="isPending"
        @change-user-score="(opt) => changeUserScore(user.id, opt)" 
      />
    </li>
  </ul>
</template>

<style lang="css" src="./index.module.css" module></style>