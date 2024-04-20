<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "~/store";
import TaskItem from "./task-item/TaskItem.vue";
// import UIButton from '~/components/ui/button/UI-Button.vue';

const store = useStore();

const completeTask = (index: number, status: boolean) => {
  store.tasksList[index].completed = status;
}
onMounted(() => {});
</script>

<template>
  <section>
    <h2 :class="$style.scoreTitle">Твои очки: {{ store.userData.score }}</h2>
    <p>Тебе в этот бар: {{ store.currentBarName }}</p>

    <h2 :class="$style.tasksTitle">Твои задания:</h2>
    <ul :class="$style.list">
      <li :class="$style.listItem" v-for="(task, index) in store.tasksList" :key="task.id">
        <TaskItem
          :task-data="task"
          @complete="(status) => completeTask(index, status)"
        />
      </li>
    </ul>
  </section>
</template>

<style lang="css" module src="./index.module.css"></style>
