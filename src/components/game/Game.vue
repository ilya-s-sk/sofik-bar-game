<script lang="ts" setup>
import GamePage from './game-page/GamePage.vue';
import PreGame from './pre-game/PreGame.vue';
import SofikPage from './sofik-page/SofikPage.vue';
import Results from './results/Results.vue';
import { useUserStore } from '~/store/user';
import ProfileModal from "~/components/game/game-page/profile-modal/ProfileModal.vue";

const store = useUserStore();
</script>

<template>
  <SofikPage v-if="store.userData.isSofik" />

  <template v-else>
    <ProfileModal />
    <PreGame v-if="store.isGameNotStarted" />
    <Results v-else-if="store.isGameEnded" />
    <GamePage v-else-if="store.isGameNow" />
  </template>
</template>