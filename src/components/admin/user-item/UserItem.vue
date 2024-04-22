<script lang="ts" setup>
import { ref } from 'vue';
import { IUserData } from '~/api/types';
import UIButton from '~/components/ui/button/UI-Button.vue';
import { useAdminStore } from '~/store/admin';

const adminStore = useAdminStore();


const props = defineProps<{
  user: IUserData;
}>();

const pending = ref(false);
const selectedCircle = ref(props.user.currentCircle);

const changeCircle = async () => {
  if (
    typeof selectedCircle.value !== 'number' 
    || selectedCircle.value === props.user.currentCircle
  ) return;

  pending.value = true;
  await adminStore.changeCircle(props.user.id, selectedCircle.value);
  pending.value = false;
}

const deleteUser = async () => {

}
</script>

<template>
  <div :class="$style.infoBlock">
    <p>
      id: <span>{{ user.id }}</span>
    </p>
    <p>
      <span>{{ user.login }}</span>
    </p>
  </div>
  <div :class="$style.infoBlock">
    <p>
      Счет: <span>{{ user.score }}</span>
    </p>
    <p>
      Это Софик: <span>{{ !!user.isSofik }}</span>
    </p>
  </div>
  <div :class="$style.infoBlock">
    <p>
      Текущий круг: <span>{{ user.currentCircle }}</span>
    </p>
    <p>
      Готов перейти: <span>{{ !!user.is_completed }}</span>
    </p>
  </div>
  <div :class="$style.actions">
    <div :class="$style.actionBlock">
      <UIButton :loading="pending" @click="changeCircle">Перевести на круг</UIButton>
      <input
        v-model.number="selectedCircle"
        :class="$style.numberInput"
        type="number"
        inputmode="numeric"
      />
    </div>
    <div :class="$style.actionBlock">
      <UIButton theme="red" :loading="pending" @click="deleteUser">Удалить пользователя</UIButton>
    </div>
  </div>
</template>

<style lang="css" src="./index.module.css" module></style>
