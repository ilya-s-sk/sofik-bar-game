<script lang="ts" setup>

const resultsList = [
  {
    name: 'Даник',
    score: 10,
  },
  {
    name: 'Даник 2',
    score: 24,
  },
  {
    name: 'Даник 3',
    score: 50,
  },
]
</script>

<template>
  <section :class="$style.results">
    <h1 :class="$style.title">Результаты:</h1>

    <ol :class="$style.list">
      <li v-for="(resultItem, index) in resultsList" :key="index" :class="$style.item">
        <h3 :class="$style.name">{{ resultItem.name }}</h3>
        <p :class="$style.score">{{ resultItem.score }}</p>
      </li>
    </ol>
  </section>
</template>

<style lang="css" src="./index.module.css" module></style>