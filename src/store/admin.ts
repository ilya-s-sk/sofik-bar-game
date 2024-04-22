import { defineStore } from "pinia";
import { api } from "~/api";
import { IUserData } from "~/api/types";
import { useDialogStore } from "./dialog";

const MOSK_USERS_DATA: IState = {
  users: [
    {
      id: 13,
      login: 'Даник',
      score: 0,
      isSofik: 0,
      currentCircle: 1,
      is_completed: 1,
    },
    {
      id: 14,
      login: 'Даник Еще один',
      score: 0,
      isSofik: 0,
      currentCircle: 1,
      is_completed: 1,
    },
  ]
}

interface IState {
  users: IUserData[];
}

export const useAdminStore = defineStore('admin', {
  state: (): IState => ({
    users: [],
  }),
  actions: {
    async getUsers() {
      const response = await api.getUsers();

      if (!response || !response.users) {
        this.showError(response)
        return;
      }

      this.users = response.users;
    },

    async changeCircle(userId: number, circle: number) {
      const response = await api.systemChangeCircle(userId, circle);

      if (!response) {
        this.showError(response)
        return;
      }

      const userIndex = this.users.findIndex(u => u.id === userId);
      this.users[userIndex].currentCircle = circle;
    },

    async deleteUser(userId: number) {
      const response = await api.systemDeleteUser(userId);

      if (!response) {
        this.showError(response)
        return;
      }

      this.users = this.users.filter(u => u.id !== userId);
    },

    showError(data: unknown) {
      const dialogStore = useDialogStore();
      dialogStore.showDialog(`<p>
        Что-то пошло не так<br>
        Попробуй ещё раз позже<br>
        ${JSON.stringify(data)}
      </p>`);
    }
  },
});