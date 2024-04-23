<script lang="ts" setup>
import { ITaskEntity } from "~/types";
import UIButton from "~/components/ui/button/UI-Button.vue";

const emit = defineEmits<{
  (e: 'complete'): void,
}>();

defineProps<{
  taskData: ITaskEntity;
  pending: boolean;
}>();

const complete = () => {
  emit('complete');
}
</script>

<template>
  <div :class="$style.task">
    <h3 :class="$style.title">{{ taskData.title }}</h3>
    <p :class="$style.desc">{{ taskData.desc }}</p>
    <p>За него получишь баллов: <span :class="$style.cost">{{ taskData.cost }}</span></p>
    <UIButton
      v-if="!taskData.completed"
      :loading="pending"
      @click="complete"
    >Готово!</UIButton>
    <p v-if="taskData.completed" :class="$style.textComplete">Задание выполнено!</p>
  </div>
</template>

<style src="./index.module.css" module></style>
