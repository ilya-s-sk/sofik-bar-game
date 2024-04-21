<script lang="ts" setup>
import GamePage from './game-page/GamePage.vue';
import PreGame from './pre-game/PreGame.vue';
import SofikPage from './sofik-page/SofikPage.vue';
import { useUserStore } from '~/store/user';

const store = useUserStore();

</script>

<template>
  <SofikPage v-if="true" />
  <template v-else>
    <GamePage v-if="store.hasGameData" />
    <PreGame v-else />
  </template>
</template>