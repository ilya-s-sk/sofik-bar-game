import { defineStore } from "pinia";
import { api } from '~/api';
import { ILoginBody } from "~/api/types";
import { CODES } from "~/api/consts";
import { IGameOptions, ITaskEntity, IGameUserData, ICurrentBar } from "~/types";
import { IUserData as IApiUserData } from "~/api/types";
import { useDialogStore } from "./dialog";

interface IState {
  userData: IGameUserData;
  currentBarName: ICurrentBar;
  tasksList: ITaskEntity[];
  gameOptions: IGameOptions;
  resultUsers: IApiUserData[];
}

export const useUserStore = defineStore('user', {
  state: (): IState => ({
    userData: {
      id: -1,
      name: '',
      isSofik: false,
      score: 0,
      isReady: false,
      current_circle: 0,
    },

    gameOptions: {
      showTasks: false,
      isReady: false,
    },

    currentBarName: {
      address: '',
      name: '',
      id: -1,
    },

    tasksList: [],

    resultUsers: [],
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
      return state.userData.stage === 'beforeGame';
    },
    isGameNow(state) {
      return state.userData.stage === 'game';
    },
    isGameEnded(state) {
      return state.userData.stage === 'afterGame';
    }
  },
  actions: {
    setUserData(userData: Partial<IGameUserData>) {
      this.userData = {
        ...this.userData,
        ...userData,
      }
    },

    async updateTaskById(id: number) {
      const taskIndex = this.tasksList.findIndex(t => t.id === id);

      if (taskIndex === -1) return;

      const response = await api.setTaskStatus({ 
        userId: this.userData.id, 
        taskId: id,
      });

      if (!response || response.code !== CODES.SUCCESS) {
        return;
      }

      const task = this.tasksList[taskIndex];

      this.userData.score += task.cost;
      this.tasksList[taskIndex] = {
        ...this.tasksList[taskIndex],
        completed: true,
      };
    },

    async login(data: ILoginBody) {
      const dialogStore = useDialogStore();

      const result = await api.login(data);

      if (!result) {
        this.showDialogWithMessage('', result);
        return;
      };

      if (!result.id || typeof result.id !== 'number' || result.code === CODES.ERROR) {
        dialogStore.showDialog('<h2>Перепроверь имя и пароль</h2>');
        return;
      }
  
      this.setUserData({ id: result.id, name: data.login, });
      await this.getUserData();
    },

    async getUserData() {
      if (this.userData.id === -1) return;

      const response = await api.getUserData(this.userData.id);
      const isErrorCode = response?.code && [CODES.INVALID_JSON, CODES.ERROR, CODES.FATAL_ERROR].includes(response.code);
      if (!response || isErrorCode) {
        this.showDialogWithMessage('', response);
        return
      };

      const { data, current_bar, ...userData } = response;

      if (this.userData.isReady !== !!userData.is_ready) {
        this.gameOptions.showTasks = false;
      }

      this.userData = {
        ...this.userData,
        ...userData,
        isSofik: Boolean(userData.isSofik),
        isReady: Boolean(userData.is_ready),
      };

      this.currentBarName = {
        id: current_bar?.id || -1,
        name: current_bar?.name || '',
        address: current_bar?.address || '',
      }

      this.tasksList = (data?.tasks || [])
        .filter(t => t.is_completed !== -1)
        .map(({ id, name, desc, cost, is_completed }) => ({
          id,
          title: name,
          desc,
          cost,
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
      this.gameOptions.isReady = true;
    },

    async changeStage() {
      const response = await api.changeStage(this.userData.id, this.currentBarName.id);

      const isErrorCode = response?.code && [CODES.INVALID_JSON, CODES.ERROR, CODES.FATAL_ERROR].includes(response?.code);
      if (!response || isErrorCode) {
        this.showDialogWithMessage('', response);
        return;
      }

      if(response.code === CODES.PLAYERS_ARE_NOT_READY) {
        this.showDialogWithMessage(`<p>
          Ещё не все игроки готовы, ждём остальных<br>
          Когда все будут готовы, можно получить новый бар и задания<br>
          Для этого нажми еще раз кнопку или обнови страницу<br>
          ${response?.result}
        </p>`);
        return;
      }

      this.userData.isReady = true;
      this.gameOptions.showTasks = false;
      this.gameOptions.isReady = false;
      await this.getUserData();
    },
    async getResults() {
      const response = await api.getUsers();

      if (!response || !response.users) {
        this.showDialogWithMessage('', response);
        return;
      }

      const users = response.users
        .filter(user => !user.is_sofik)
        .sort((a, b) => b.score - a.score);
      this.resultUsers = users;
    },
    showDialogWithMessage(message?: string, response?: unknown) {
      const dialogStore = useDialogStore();
      const defaultError = `<p>
        Что-то пошло не так<br>
        Попробуй ещё раз позже<br>
        ${(response ? JSON.stringify(response) : '')}
      </p>`

      dialogStore.showDialog(message || defaultError);
    }
  },
});