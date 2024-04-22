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
    <h3>{{ taskData.title }}</h3>
    <p>{{ taskData.desc }}</p>
    <p>За него получишь баллов: {{ taskData.cost }}</p>
    <UIButton
      :theme="taskData.completed ? 'red' : 'blue'"
      :loading="pending"
      @click="complete"
    >{{ taskData.completed ? "Передумать" : "Готово!" }}</UIButton>
  </div>
</template>

<style src="./index.module.css" module></style>
