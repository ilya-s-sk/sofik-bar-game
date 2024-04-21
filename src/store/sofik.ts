import { defineStore } from "pinia";
import { api } from '~/api'
import { IUserData } from "~/api/types";
import { IChangeScoreOptions } from "~/types";

interface IState {
  users: IUserData[],
}

const MOSK_USERS_DATA = [
  {
    id: 0,
    name: 'Даник',
    score: 0,
  },
  {
    id: 1,
    name: 'Даник Еще один',
    score: 0,
  },
]

export const useSofikStore = defineStore('sofik', {
  state: (): IState => ({
    users: [],
  }),
  actions: {
    async getUsers() {
      const users = MOSK_USERS_DATA  //await api.sofikGetUsers();
      if (!users || !users.length) {
        return;
      }
      this.users = users;
    },
    async changeUserScore(id: number, options: IChangeScoreOptions) {
      const userIndex = this.users.findIndex(user => user.id === id);

      if (userIndex === -1) return;

      const user = this.users[userIndex];
      const newScore = options.increase ? user.score + options.amount : user.score - options.amount;

      await api.sofikSetScore({ id, count: newScore });

      this.users[userIndex] = {
        ...user,
        score: newScore
      };
    }
  }
});