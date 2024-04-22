<script lang="ts" setup>
import GamePage from './game-page/GamePage.vue';
import PreGame from './pre-game/PreGame.vue';
import SofikPage from './sofik-page/SofikPage.vue';
import Results from './results/Results.vue';
import { useUserStore } from '~/store/user';
import { onBeforeMount, ref } from 'vue';

const store = useUserStore();

const pending = ref(false);

onBeforeMount(async () => {
  pending.value = true;
  await store.getUserData();
  pending.value = false;
});
</script>

<template>
  <h1 v-if="pending">Загрузка...</h1>
  
  <template v-else>
    <!-- <Results /> -->
    <SofikPage v-if="store.userData.isSofik" />
    <template v-else>
      <PreGame v-if="store.isGameNotStarted" />
      <GamePage v-else />
    </template>
  </template>
</template>