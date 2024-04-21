<script lang="ts" setup>
import { ref } from "vue";
import UIButton from "~/components/ui/button/UI-Button.vue";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();

const isPending = ref(false);

const checkIsGameReady = async () => {
  isPending.value = true;
  await userStore.startGame();
  isPending.value = false;
};
</script>

<template>
  <h1 class="title">Игра скоро начнётся</h1>
  <p class="text">Время ещё не пришло, ждём</p>

  <UIButton
    :class="$style.button"
    @click="checkIsGameReady"
    :loading="isPending"
  >Ну когда уже?</UIButton>
</template>

<style lang="css" src="./index.module.css" module></style>
