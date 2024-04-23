import { defineStore } from "pinia";
import { api } from '~/api'
import { IUserData } from "~/api/types";
import { IChangeScoreOptions } from "~/types";
import { useDialogStore } from "./dialog";

interface IState {
  users: IUserData[],
}

export const useSofikStore = defineStore('sofik', {
  state: (): IState => ({
    users: [],
  }),
  actions: {
    async startGame() {
      const dialogStore = useDialogStore();
      const response = await api.sofikStartGame();

      if (!response) {
        dialogStore.showDialog(`<p>
          Что-то пошло не так<br>
          Попробуй ещё раз позже<br>
        </p>`);
        return;
      }

      await this.getUsers();
    },
    async getUsers() {
      const dialogStore = useDialogStore();
      const response = await api.getUsers();

      if (!response || !response.users) {
        dialogStore.showDialog(`<p>
          Что-то пошло не так<br>
          Попробуй ещё раз позже<br>
          ${ response && 'result' in response ? response.result : '' }
        </p>`);
        return;
      }
      this.users = response.users.filter(u => !u.is_sofik);
    },
    async changeUserScore(id: number, options: IChangeScoreOptions) {
      const dialogStore = useDialogStore();
      const userIndex = this.users.findIndex(user => user.id === id);

      if (userIndex === -1) return;

      const user = this.users[userIndex];
      const response = await api.sofikSetScore({ userId: id, count: options.amount });

      if (!response || !response.count) {
        dialogStore.showDialog(`<p>
          Что-то пошло не так<br>
          Попробуй ещё раз позже<br>
          Ошибка: ${response?.result}
        </p>`);
        return;
      }

      this.users[userIndex] = {
        ...user,
        score: response.count
      };
    }
  }
});