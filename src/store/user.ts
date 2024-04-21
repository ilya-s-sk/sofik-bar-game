import { defineStore } from "pinia";
import { api } from '~/api';
import { ILoginBody } from "~/api/types";
import { CODES } from "~/api/consts";
import { ITaskEntity, IUserData } from "~/types";
import { useDialogStore } from "./dialog";
import { storageEntry } from "~/storage";

const MOCK_TASKS_DATA = {
  currentBarName: 'Лучший бар в мире',
  tasksList: [
    {
      id: 0,
      title: 'Задание 1',
      cost: 10,
      completed: false,
    },
    {
      id: 1,
      title: 'Задание 2',
      cost: 8,
      completed: false,
    },
  ]
}

interface IState {
  userData: IUserData;
  currentBarName: string;
  tasksList: ITaskEntity[];
}

export const useUserStore = defineStore('user', {
  state: (): IState => ({
    userData: {
      id: -1,
      name: '',
      isSofik: false,
      score: 0,
      preparedToNextStage: false,
    },

    currentBarName: '',

    tasksList: [],
  }),
  getters: {
    hasUserData(): boolean {
      return this.userData.id > 0 && this.userData.name.length > 0;
    },
    hasGameData(): boolean {
      return this.tasksList.length > 0 && Boolean(this.currentBarName);
    },
    preparedTasksList(state) {
      return state.tasksList.filter(t => !t.completed).concat(
        state.tasksList.filter(t => t.completed)
      )
    },
    isGameNotStarted(state) {
      return state.userData.stage !== 'game';
    }
  },
  actions: {
    setUserData(userData: Partial<IUserData>) {
      this.userData = {
        ...this.userData,
        ...userData,
      }
    },

    async updateTaskById(id: number, data: Partial<ITaskEntity>) {
      const taskIndex = this.tasksList.findIndex(t => t.id === id);

      if (taskIndex === -1) return;

      await api.setTaskStatus({ userId: this.userData.id, taskId: id, completed: data.completed! })

      this.tasksList[taskIndex] = {
        ...this.tasksList[taskIndex],
        ...data,
      };
    },

    async login(data: ILoginBody) {
      const dialogStore = useDialogStore();

      const result = await api.login(data);

      if (!result) return;

      if (!result.id || typeof result.id !== 'number' || result.code === CODES.ERROR) {
        dialogStore.showDialog('<h2>Перепроверь имя и пароль</h2>');
        return;
      }
  
      this.setUserData({ id: result.id, name: data.login, });
    },
    async getUserData() {
      const response = await api.getUserData(this.userData.id);

      if (!response) return;

      const { data, ...userData } = response

      this.userData = {
        ...this.userData,
        ...userData,
      };
    },
    async startGame() {
      const dialogStore = useDialogStore();

      await this.getUserData();

      if (this.isGameNotStarted) {
        dialogStore.showDialog('<h2>Всё еще ждём</h2>');
      }
    },
    async finishStage() {
      await api.finishStage(this.userData.id);
    },
    async changeStage() {
      storageEntry.removedTasksVisiblityStatus();
    }
  },
});