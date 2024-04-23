<script lang="ts" setup>
import { Ref, ref } from "vue";
import UIButton from "~/components/ui/button/UI-Button.vue";
import { useUserStore } from "~/store/user";
import { ITaskEntity } from "~/types";
import Actions from "./actions/Actions.vue";
import TaskItem from "./task-item/TaskItem.vue";
import ProfileModal from "./profile-modal/ProfileModal.vue";

const userStore = useUserStore();
const pendingTaskId: Ref<number|null> = ref(null);
const updatePending = ref(false);

const openTasks = () => {
  userStore.gameOptions.showTasks = true;
};

const completeTask = async (task: ITaskEntity) => {
  pendingTaskId.value = task.id;
  await userStore.updateTaskById(task.id);
  pendingTaskId.value = null;
};

const update = async () => {
  updatePending.value = true;
  await userStore.getUserData();
  updatePending.value = false;
}
</script>

<template>
  <section v-if="userStore.userData.isReady">
    <div :class="$style.watingInfo">
      <h1 >Ждем, когда все участники будут готовы</h1>
      <p>Новые задания и следующий бар получишь, когда все будут готовы</p>
      <p>Нажми кнопку ниже или обнови страницу</p>
    </div>
    <UIButton :class="$style.updateButton" :loading="updatePending" @click="update">Давайте уже</UIButton>
  </section>

  <section v-else :class="$style.gamePage">
    <header :class="$style.header">
      <div>
        <p :class="$style.scoreLabel">Твои очки: <span :class="$style.score">{{ userStore.userData.score }}</span></p>
        <h2 :class="$style.nameLabel">Привет, {{ userStore.userData.name }}</h2>
      </div>
      <ProfileModal />
    </header>
    <p :class="$style.barLabel">Тебе в этот бар:<br><span :class="$style.bar">{{ userStore.currentBarName.name }}</span></p>
    <p :class="$style.adressLabel">Адрес: <span :class="$style.address">{{ userStore.currentBarName.address }}</span></p>

    <div v-if="!userStore.gameOptions.showTasks" :class="$style.showTasksBlock">
      <p>Когда дойдешь, можешь открыть задания</p>
      <UIButton :class="$style.buttonOpen" @click="openTasks">Я на месте</UIButton>
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
