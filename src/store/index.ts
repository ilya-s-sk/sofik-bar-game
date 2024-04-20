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
    }
  },
  actions: {
    setUserData(userData: Partial<IUserData>) {
      this.userData = {
        ...this.userData,
        ...userData,
      }
    },
    
  }
});