<script lang="ts" setup>
import UIButton from "~/components/ui/button/UI-Button.vue";
import { useUserStore } from "~/store/user";
import { ITaskEntity } from "~/types";
import TaskItem from "./task-item/TaskItem.vue";
import Actions from "./actions/Actions.vue";
import { Ref, ref } from "vue";

const userStore = useUserStore();
const pendingTaskId: Ref<number|null> = ref(null);

const openTasks = () => {
  userStore.gameOptions.showTasks = true;
};

const completeTask = async (task: ITaskEntity) => {
  pendingTaskId.value = task.id;
  await userStore.updateTaskById(task.id, { completed: !task.completed });
  pendingTaskId.value = null;
};
</script>

<template>
  <section :class="$style.gamePage">
    <h2 :class="$style.scoreTitle">Твои очки: {{ userStore.userData.score }}</h2>
    <p>Тебе в этот бар: {{ userStore.currentBarName }}</p>

    <div v-if="!userStore.gameOptions.showTasks" :class="$style.showTasksBlock">
      <p>Когда дойдешь, можешь открыть задания</p>
      <UIButton @click="openTasks">Я на месте</UIButton>
    </div>

    <template v-else>
      <div>
        <h2 :class="$style.tasksTitle">Твои задания:</h2>
        <TransitionGroup :class="$style.list" name="list" tag="ul">
          <li :class="$style.listItem" v-for="(task) in userStore.preparedTasksList" :key="task.id">
            <TaskItem
              :task-data="task"
              :pending="pendingTaskId === task.id"
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
