<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import UIButton from "~/components/ui/button/UI-Button.vue";
import { useUserStore } from "~/store/user";
import { storageEntry } from "~/storage";
import { ITaskEntity } from "~/types";
import TaskItem from "./task-item/TaskItem.vue";
import Actions from "./actions/Actions.vue";

const store = useUserStore();

const showTasks = ref(false);

const openTasks = () => {
  showTasks.value = true;
  storageEntry.setTasksVisibilityStatus();
};

const completeTask = async (task: ITaskEntity) => {
  store.userData.score += task.cost * (task.completed ? -1 : 1);
  await store.updateTaskById(task.id, { completed: !task.completed});
};

onBeforeMount(() => {
  showTasks.value = storageEntry.getTasksVisibilityStatus();
});
</script>

<template>
  <section :class="$style.gamePage">
    <h2 :class="$style.scoreTitle">Твои очки: {{ store.userData.score }}</h2>
    <p>Тебе в этот бар: {{ store.currentBarName }}</p>

    <div v-if="!showTasks" :class="$style.showTasksBlock">
      <p>Когда дойдешь, можешь открыть задания</p>
      <UIButton @click="openTasks">Я на месте</UIButton>
    </div>

    <template v-else>
      <div>
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
  
      <Actions />
    </template>
  </section>
</template>

<style lang="css" module src="./index.module.css"></style>
