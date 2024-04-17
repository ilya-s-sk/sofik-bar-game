<script setup lang="ts">
  import { ref } from 'vue';

  const isPassVisible = ref(false);

  const login = ref('');
  const password = ref('');

  function handleSubmit(event: Event) {
    event.preventDefault();
  }

  const showPass = () => {
    isPassVisible.value = !isPassVisible.value
  }
</script>

<template>
  <section :class="$style.login">
    <h1 :class="$style.title">Приветики</h1>

    <form :class="$style.form" @submit="handleSubmit">
      <label :class="$style.field">
        <span>Логин</span>
        <input :class="$style.input" v-model="login" type="text">
      </label>
      <label :class="$style.field">
        <span>Пароль</span>
        <input :class="$style.input" v-model="password" :type="isPassVisible ? 'text' : 'password'">
        <span 
          v-show="password.length > 0" 
          :class="$style.showPass" 
          @click="showPass"
        >{{ isPassVisible ? 'Скрыть' : 'Показать' }}</span>
      </label>
      <button :class="$style.button">Войти</button>
    </form>
  </section>
</template>

<style lang="css" module src="./index.module.css"></style>