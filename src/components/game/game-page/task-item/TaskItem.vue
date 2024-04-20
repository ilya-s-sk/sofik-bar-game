<script lang="ts" setup>
import { ITaskEntity } from "~/types";
import UIButton from "~/components/ui/button/UI-Button.vue";

defineEmits<{
  (e: 'complete'): void,
}>();

defineProps<{
  taskData: ITaskEntity;
}>();
</script>

<template>
  <div :class="$style.task">
    <h3>{{ taskData.title }}</h3>
    <p>За него получишь баллов: {{ taskData.cost }}</p>
    <UIButton
      :theme="taskData.completed ? 'red' : 'blue'"
      @click="() => $emit('complete')"
    >{{ taskData.completed ? "Передумать" : "Задание сделано" }}</UIButton>
  </div>
</template>

<style src="./index.module.css" module></style>
