<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '~/store/user';
import UIButton from '~/components/ui/button/UI-Button.vue';

const pending = ref(false);
const isResultsShow = ref(false);
const store = useUserStore();

const showResults = async () => {
  pending.value = true;
  await store.getResults();
  pending.value = false;
  if (store.resultUsers.length) {
    isResultsShow.value = true;
  }
}
</script>

<template>
  <section :class="$style.results">
    <h1 :class="$style.title">Результаты:</h1>
    <div v-if="!isResultsShow">
      <p :class="$style.showResultsText">Не смотри, пока не придешь на конечную точку!</p>
      <UIButton :class="$style.showResultsBtn" :loading="pending" @click="showResults">Я на месте</UIButton>
    </div>

    <ol v-if="isResultsShow" :class="$style.list">
      <li v-for="(resultItem, index) in store.resultUsers" :key="index" :class="$style.item">
        <h3 :class="$style.name">{{ resultItem.login }}</h3>
        <p :class="$style.score">{{ resultItem.score }}</p>
      </li>
    </ol>
  </section>
</template>

<style lang="css" src="./index.module.css" module></style>