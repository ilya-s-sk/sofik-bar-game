<script lang="ts" setup>
import { ref } from 'vue';
import { IUserData } from '~/api/types';
import UIButton from '~/components/ui/button/UI-Button.vue';

const currentScoreAmount = ref(1);

defineProps<{
  userData: IUserData;
}>();
</script>

<template>
  <div :class="$style.userItem">
    <div :class="$style.info">
      <h3 :class="$style.name">{{ userData.name }}</h3>
      <p>Счёт: {{ userData.score }}</p>
    </div>
    <div :class="$style.controls">
      <label :class="$style.options">
        <span>Изменить счет на:</span>
        <input
          v-model="currentScoreAmount"
          :class="$style.input"
          type="number"
          inputmode="numeric"
        >
      </label>
      <div :class="$style.actions">
        <UIButton>Увеличить</UIButton>
        <UIButton theme="red">Уменьшить</UIButton>
      </div>
    </div>
  </div>
</template>

<style lang="css" src="./index.module.css" module></style>