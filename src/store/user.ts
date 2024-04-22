import { defineStore } from "pinia";
import { api } from '~/api';
import { ILoginBody } from "~/api/types";
import { CODES } from "~/api/consts";
import { IGameOptions, ITaskEntity, IUserData } from "~/types";
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
  gameOptions: IGameOptions;
}

export const useUserStore = defineStore('user', {
  state: (): IState => ({
    userData: {
      id: -1,
      name: '',
      isSofik: false,
      score: 0,
      isReady: false,
    },

    gameOptions: {
      showTasks: false,
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

      const response = await api.setTaskStatus({ 
        userId: this.userData.id, 
        taskId: id, 
        completed: data.completed! 
      });

      if (!response || response.code !== CODES.SUCCESS) {
        return;
      }

      const task = this.tasksList[taskIndex];

      this.userData.score += task.cost * (data.completed ? -1 : 1);
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

      if (!response) {
        this.showDialogWithMessage(`<p>
          Что-то пошло не так<br>
          Попробуй ещё раз позже
        </p>`);
        return
      };

      const { data, ...userData } = response;

      this.userData = {
        ...this.userData,
        ...userData,
        isSofik: Boolean(userData.isSofik),
        isReady: Boolean(userData.is_ready),
      };

      this.tasksList = (data.tasks || []).map(({ id, name, desc, cost, is_completed }) => ({
        id,
        title: name,
        desc,
        cost: cost,
        completed: Boolean(is_completed)
      }))
    },
    async startGame() {
      await this.getUserData();

      if (this.isGameNotStarted) {
        this.showDialogWithMessage('<h2>Всё еще ждём</h2>');
      };
    },
    async finishStage() {
      const response = await api.finishStage(this.userData.id);

      if (!response || response.code !== CODES.SUCCESS) {
        this.showDialogWithMessage(`<p>
          Что-то пошло не так<br>
          Попробуй ещё раз позже<br>
          Ошибка: ${response?.result}
        </p>`);
        return;
      }

      this.userData.isReady = true;
    },
    async changeStage() {
      const response = await api.changeStage(this.userData.id);

      if (!response || response.code === CODES.PLAYERS_ARE_NOT_READY) {
        this.showDialogWithMessage(`<p>
          Ещё не все игроки готовы<br>
          Покричите на них в чате<br>
          ${response?.result}
        </p>`);
        return;
      }

      this.gameOptions.showTasks = false;
      await this.getUserData();
    },
    showDialogWithMessage(message: string) {
      const dialogStore = useDialogStore();
      dialogStore.showDialog(message);
    }
  },
});