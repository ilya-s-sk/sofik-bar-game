<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import Button from "~/components/ui/button/UI-Button.vue";
import Dialog from "~/components/ui/dialog/UI-Dialog.vue";
import Info from "~/components/ui/icons/InfoIcon.vue";
import { ILoginField } from "~/types";
import { useUserStore } from '~/store/user';
import { loginRegExp, passErrorText, loginErrorText } from "./consts";

const store = useUserStore();

const isPending = ref(false);
const isPassVisible = ref(false);
const isInfoModalShow = ref(false);

const login = reactive<ILoginField>({
  value: "",
  showError: false,
  validate() {
    return loginRegExp.test(this.value);
  },
});
const password = reactive<ILoginField>({
  value: "",
  showError: false,
  validate() {
    return this.value.length > 6;
  },
});

const passFieldCaption = computed(() => {
  return password.showError ? passErrorText : "";
});
const loginFieldsCaption = computed(() => {
  return login.showError ? loginErrorText : "";
});

const validateFields = (): boolean => {
  const fields = [login, password];

  fields.forEach((field) => {
    field.showError = !field.validate();
  });

  return fields.some((f) => f.showError);
};

const showPass = () => {
  isPassVisible.value = !isPassVisible.value;
};

const handleSubmit = async (event: Event) => {
  event.preventDefault();

  const hasError = validateFields();
  if (hasError) {
    return;
  }

  isPending.value = true;

  const data = {
    login: login.value,
    password: password.value,
  };
  await store.login(data);
  
  isPending.value = false;
};
</script>

<template>
  <section :class="$style.login">
    <div :class="$style.infoBlock">
      <h1 :class="$style.title">Приветики</h1>
      <p :class="$style.text">это Софик Бар Игра</p>
      <p :class="$style.text">
        представься:
        <button
          :class="[$style.infoButton, 'icon-button']"
          @click="() => (isInfoModalShow = true)"
          aria-label="Информация"
        >
          <Info />
        </button>
      </p>
    </div>

    <form :class="$style.form" @submit="handleSubmit">
      <label :class="$style.field">
        <span :class="$style.label">имя</span>
        <input
          :class="$style.input"
          v-model="login.value"
          type="text"
          @focus="() => (login.showError = false)"
        />
        <div :class="$style.captionBlock">
          <span
            :class="[$style.caption, login.showError ? $style.error : '']"
            @click="showPass"
            >{{ loginFieldsCaption }}</span
          >
        </div>
      </label>

      <label :class="$style.field">
        <span :class="$style.label">пароль</span>
        <input
          :class="$style.input"
          v-model="password.value"
          :type="isPassVisible ? 'text' : 'password'"
          autocomplete="current-password"
          @focus="() => (password.showError = false)"
        />
        <div :class="$style.captionBlock">
          <button
            :class="[$style.caption, password.showError ? $style.error : '']"
            @click="showPass"
          >
            {{ passFieldCaption }}
          </button>
          <button
            v-if="password.value.length > 0"
            :class="$style.caption"
            type="button"
            @click="showPass"
          >
            {{ isPassVisible ? "Скрыть" : "Показать" }}
          </button>
        </div>
      </label>
      <Button :class="$style.button" :loading="isPending" :disabled="isPending"
        >Войти</Button
      >
    </form>

    <Dialog :isShow="isInfoModalShow" @close="() => (isInfoModalShow = false)">
      <p>
        Придумай себе имя и пароль или введи те, что вводил раньше<br /><br />
        Если ты Софик - введи свои зарезервированные имя с паролем
      </p>
    </Dialog>
  </section>
</template>

<style lang="css" module src="./index.module.css"></style>
