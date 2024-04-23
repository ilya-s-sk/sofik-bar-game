<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import RefreshIcon from '~/components/ui/icons/RefreshIcon.vue'; 
import { useSofikStore } from '~/store/sofik';
import { IChangeScoreOptions } from '~/types';
import UserItem from './user-item/UserItem.vue';
import { useUserStore } from '~/store/user';
import UIButton from '~/components/ui/button/UI-Button.vue';

const userStore = useUserStore();
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

const startGame = async () => {
  isPending.value = true;
  await sofikStore.startGame();
  isPending.value = false;
}

onBeforeMount(async () => {
  if (!userStore.isGameNotStarted) {
    await sofikStore.getUsers();
  }
})
</script>

<template>
  <section v-if="userStore.isGameNotStarted" :class="$style.preGame">
    <h1>Игра пока на началась</h1>
    <UIButton @click="startGame">Начать игру!</UIButton>
  </section>

  <section v-else :class="$style.sofikPage">
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
  </section>
</template>

<style lang="css" src="./index.module.css" module></style>