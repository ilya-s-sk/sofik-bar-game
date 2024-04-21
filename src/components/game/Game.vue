<script lang="ts" setup>
import GamePage from './game-page/GamePage.vue';
import PreGame from './pre-game/PreGame.vue';
import SofikPage from './sofik-page/SofikPage.vue';
import { useUserStore } from '~/store/user';

const store = useUserStore();

</script>

<template>
  <SofikPage v-if="store.userData.isSofik" />
  <template v-else>
    <PreGame v-if="!store.hasGameData || store.isGameNotStarted" />
    <GamePage v-else />
  </template>
</template>