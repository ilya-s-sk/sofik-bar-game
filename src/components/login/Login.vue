<script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  import { loginRegExp, passErrorText, loginErrorText } from './consts';
  import Button from '../ui/button/Button.vue';
  import { ILoginField } from '../../types';

  const isPassVisible = ref(false);
  const isPending =  ref(false);

  const login = reactive<ILoginField>({
    value: '',
    showError: false,
    validate() {
      return loginRegExp.test(this.value);
    }
  });
  const password = reactive<ILoginField>({
    value: '',
    showError: false,
    validate() {
      return this.value.length > 6;
    }
  });

  const passFieldCaption = computed(() => {
    if (!password.showError && password.value.length > 0) {
      return isPassVisible.value ? 'Скрыть' : 'Показать'
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

  const showPass = () => {
    isPassVisible.value = !isPassVisible.value
  }

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    const hasError = validateFields();
    if (hasError) {
      return;
    }

    isPending.value = true;
    setTimeout(() => {
      isPending.value = false;
    }, 1000);
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
      <Button
        :class="$style.button"
        :isLoading="isPending"
        :disabled="isPending"
      >Войти</Button>
    </form>
  </section>
</template>

<style lang="css" module src="./index.module.css"></style>