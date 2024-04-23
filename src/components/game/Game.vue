<script lang="ts" setup>
import Admin from '~/components/admin/Admin.vue';
import GamePage from './game-page/GamePage.vue';
import PreGame from './pre-game/PreGame.vue';
import SofikPage from './sofik-page/SofikPage.vue';
import Results from './results/Results.vue';
import { useUserStore } from '~/store/user';

const store = useUserStore();
</script>

<template>
  <Admin v-if="store.userData.isAdmin" />

  <SofikPage v-else-if="store.userData.isSofik" />

  <template v-else>
    <PreGame v-if="store.isGameNotStarted" />
    <Results v-else-if="store.isGameEnded" />
    <GamePage v-else-if="store.isGameNow" />
  </template>
</template>