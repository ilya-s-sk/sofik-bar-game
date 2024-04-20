<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import UIButton from "~/components/ui/button/UI-Button.vue";
import { useStore } from "~/store";
import { storageEntry } from "~/storage";
import { ITaskEntity } from "~/types";
import TaskItem from "./task-item/TaskItem.vue";

const store = useStore();

const showTasks = ref(false);

const openTasks = () => {
  showTasks.value = true;
  storageEntry.setTasksVisibilityStatus();
};

const completeTask = (task: ITaskEntity) => {
  store.userData.score += task.cost * (task.completed ? -1 : 1);
  store.updateTaskById(task.id, { completed: !task.completed});
};

onBeforeMount(() => {
  showTasks.value = storageEntry.getTasksVisibilityStatus();
});

onBeforeUnmount(() => {
  // storageEntry.removedTasksVisiblityStatus();
})
</script>

<template>
  <section>
    <h2 :class="$style.scoreTitle">Твои очки: {{ store.userData.score }}</h2>
    <p>Тебе в этот бар: {{ store.currentBarName }}</p>

    <div v-if="!showTasks" :class="$style.showTasksBlock">
      <p>Когда дойдешь, можешь открыть задания</p>
      <UIButton @click="openTasks">Я на месте</UIButton>
    </div>

    <div v-else>
      <h2 :class="$style.tasksTitle">Твои задания:</h2>
      <TransitionGroup :class="$style.list" name="list" tag="ul">
        <li :class="$style.listItem" v-for="(task) in store.preparedTasksList" :key="task.id">
          <TaskItem
            :task-data="task"
            @complete="() => completeTask(task)"
          />
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style lang="css" module src="./index.module.css"></style>
