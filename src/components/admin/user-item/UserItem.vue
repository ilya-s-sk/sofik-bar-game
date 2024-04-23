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

const deleteUser = async () => {
  pending.value = true;
  await adminStore.deleteUser(props.user.id);
  pending.value = false;
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
      Это Софик: <span>{{ !!user.is_sofik }}</span>
    </p>
  </div>
  <div :class="$style.infoBlock">
    <p>
      Текущий круг: <span>{{ user.current_circle }}</span>
    </p>
    <p>
      Готов перейти: <span>{{ !!user.is_ready }}</span>
    </p>
  </div>
  <div :class="$style.actions">
    <div :class="$style.actionBlock">
      <UIButton theme="red" :loading="pending" @click="deleteUser">Удалить пользователя</UIButton>
    </div>
  </div>
</template>

<style lang="css" src="./index.module.css" module></style>
