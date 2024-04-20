<script lang="ts" setup>
import { useStore } from '~/store';
import PreGame from '~/components/game/pre-game/PreGame.vue';
import GamePage from './game-page/GamePage.vue';
import { onBeforeMount } from 'vue';

const store = useStore();

onBeforeMount(() => {
  store.$patch({
    currentBarName: 'Лучший бар в мире',
    tasksList: [
      {
        id: 0,
        title: 'Задание 1',
        cost: 10,
        completed: false,
      },
      {
        id: 1,
        title: 'Задание 2',
        cost: 8,
        completed: false,
      },
    ]
  })
})
</script>

<template>
  <PreGame v-if="false" />

  <GamePage v-else />
</template>