<script lang="ts" setup>
import PreGame from '~/components/game/pre-game/PreGame.vue';
import GamePage from './game-page/GamePage.vue';
import { useStore } from '~/store';

const store = useStore();

</script>

<template>
  <GamePage v-if="store.hasGameData" />
  <PreGame v-else />
</template>