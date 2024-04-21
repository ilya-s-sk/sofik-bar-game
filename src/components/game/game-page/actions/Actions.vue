<script lang="ts" setup>
import { ref } from "vue";
import UIButton from "~/components/ui/button/UI-Button.vue";
import { useUserStore } from "~/store/user";

const pending = ref(false);

const store = useUserStore();

const finishStage = async () => {
  pending.value = true;
  await store.finishStage()
  pending.value = false;
};

const changeStage = async () => {
  pending.value = true;
  await store.changeStage();
  pending.value = false;
}
</script>

<template>
  <div :class="$style.actions">
    <UIButton
      :disabled="store.userData.isReady"
      :loading="!store.userData.isReady && pending"
      @click="finishStage"
    >Я тут всё</UIButton>
    <UIButton 
      :disabled="!store.userData.isReady"
      :loading="store.userData.isReady && pending"
      @click="changeStage"
    >Пойдем дальше</UIButton>
  </div>
</template>

<style lang="css" src="./index.module.css" module></style>
