<script lang="ts" setup>
import { ref } from 'vue';
import { IUserData } from '~/api/types';
import UIButton from '~/components/ui/button/UI-Button.vue';
import { IChangeScoreOptions } from '~/types';

defineProps<{
  userData: IUserData;
  pending: boolean;
}>();

const emit = defineEmits<{
  (e: 'change-user-score', options: IChangeScoreOptions): void,
}>()

const currentScoreAmount = ref(1);

const changeUserScore = (increase: boolean) => {
  emit('change-user-score', { amount: currentScoreAmount.value * (increase ? 1 : -1) });
}

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
        <div :class="$style.inputBlock">
          <button :class="$style.changeAmountBtn" type="button" @click="() => currentScoreAmount--"><span>-</span></button>
          <input
            v-model="currentScoreAmount"
            :class="$style.input"
            type="number"
            inputmode="numeric"
          >
          <button :class="$style.changeAmountBtn" type="button" @click="() => currentScoreAmount++"><span>+</span></button>
        </div>
      </label>
      <div :class="$style.actions">
        <UIButton :disabled="pending" @click="() => changeUserScore(true)">Увеличить</UIButton>
        <UIButton :disabled="pending" theme="red" @click="() => changeUserScore(false)">Уменьшить</UIButton>
      </div>
    </div>
  </div>
</template>

<style lang="css" src="./index.module.css" module></style>