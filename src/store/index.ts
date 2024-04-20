import { defineStore } from "pinia";
import { ITaskEntity, IUserData } from "~/types";

interface IState {
  userData: IUserData;
  currentBarName: string;
  tasksList: ITaskEntity[];
}

export const useStore = defineStore('store', {
  state: (): IState => ({
    userData: {
      id: -1,
      name: '',
      isSofik: false,
      score: 0,
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
    }
  },
  actions: {
    setUserData(userData: Partial<IUserData>) {
      this.userData = {
        ...this.userData,
        ...userData,
      }
    },
    updateTaskById(id: number, data: Partial<ITaskEntity>) {
      const taskIndex = this.tasksList.findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        this.tasksList[taskIndex] = {
          ...this.tasksList[taskIndex],
          ...data,
        }
      }
    }
  },
});