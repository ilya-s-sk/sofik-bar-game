import { defineStore } from "pinia";
import { IUserData } from "../types";

export const useStore = defineStore('store', {
  state: () => ({
    userData: {
      id: -1,
      name: '',
      isSofik: false,
    }
  }),
  getters: {
    hasUserData(): boolean {
      return this.userData.id > 0 && this.userData.name.length > 0;
    }
  },
  actions: {
    setUserData(userData: IUserData) {
      const { id, name, isSofik } = userData;
      this.userData = {
        id, name, isSofik,
      }
    }
  }
});