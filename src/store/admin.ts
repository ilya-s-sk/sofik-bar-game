import { defineStore } from "pinia";
import { api } from "~/api";
import { IUserData } from "~/api/types";
import { useDialogStore } from "./dialog";

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

    async forceNextCircle() {
      const response = await api.systemForceNextCircle();

      if (!response) {
        this.showError(response)
        return;
      }

      this.users = this.users.map(u => ({
        ...u,
        current_circle: u.current_circle + 1,
      }))
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