<script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  import { loginRegExp, passErrorText, loginErrorText } from './consts';

  interface IField {
    value: string;
    showError: boolean;
    validate: () => boolean
  }

  const isPassVisible = ref(false);

  const login = reactive<IField>({
    value: '',
    showError: false,
    validate() {
      return loginRegExp.test(this.value);
    }
  });
  const password = reactive<IField>({
    value: '',
    showError: false,
    validate() {
      return this.value.length > 6;
    }
  });

  const passFieldCaption = computed(() => {
    if (!password.showError && password.value.length > 0) {
      return isPassVisible ? 'Скрыть' : 'Показать'
    }
    return password.showError ? passErrorText : '';
  });
  const loginFieldsCaption = computed(() => {
    return login.showError ? loginErrorText : '';
  });

  const validateFields = (): boolean => {
    const fields = [login, password];

    fields.forEach(field => {
      field.showError = !field.validate()
    });

    return fields.some(f => f.showError);
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    const hasError = validateFields();
    if (hasError) {
      return;
    }
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
        <input :class="$style.input" v-model="login.value" type="text" @focus="() => login.showError = false">
        <span 
          :class="[$style.caption, login.showError ? $style.error : '']" 
          @click="showPass"
        >{{ loginFieldsCaption }}</span>
      </label>
      <label :class="$style.field">
        <span>Пароль</span>
        <input
          :class="$style.input"
          v-model="password.value"
          :type="isPassVisible ? 'text' : 'password'"
          @focus="() => password.showError = false"
        >
        <span 
          :class="[$style.caption, password.showError ? $style.error : '']"
          @click="showPass"
        >{{ passFieldCaption }}</span>
      </label>
      <button :class="$style.button">Войти</button>
    </form>
  </section>
</template>

<style lang="css" module src="./index.module.css"></style>