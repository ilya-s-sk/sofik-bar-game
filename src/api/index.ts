import { useDialogStore } from "~/store/dialog";
import { useUserStore } from '~/store/user';
import { ICurrentDataResponse, IFetchOptions, ILoginBody, IUserData, ILoginResponse, ISetScoreRequest } from './types'

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

const BASE_URL = 'http://sofiqgame.dlyamegaturboultrakachkov.keenetic.link:80/api';

class Api {
  private baseUrl = BASE_URL;

  async fetch<T>({ url, method = 'GET', body }: IFetchOptions): Promise<T | null> {
    const bodyJson = JSON.stringify(body);
    const dialogStore = useDialogStore();

    try {
      const response = await fetch(`${this.baseUrl}/${url}`, {
        method,
        body: bodyJson,
      });
      
      if (!response.ok) {
        const {status, statusText} = response
        throw { status, statusText }
      }

      const result = await response.json();

      return result;
    } catch(err) {
      dialogStore.showErrorDialog(err);
      return null;
    }
  }

  async login(body: ILoginBody) {
    return await this.fetch<ILoginResponse>({ url: 'user/login', method: 'POST', body });
  }

  async getUserData(id: number) {
    return await this.fetch<ICurrentDataResponse>({ url: `user/current-data?id=${id}` })
  }

  async startGame() {
    const store = useUserStore();
    const dialogStore = useDialogStore();

    // имитация запроса
    const result: { tasksList: any[], currentBarName: string, } = await new Promise(resolve => {
      setTimeout(() => {
        resolve(MOCK_TASKS_DATA)
      }, 1000)
    });

    if (!result.tasksList.length) {
      dialogStore.showDialog('<h2>Всё еще ждём</h2>');
      return;
    }

    store.$patch(result);
  }

  async setTaskStatus() {}

  async sofikGetUsers() {
    return this.fetch<IUserData[]>({ url: 'sofik/get-users', });
  }

  async sofikSetScore(body: ISetScoreRequest) {
    return this.fetch({ url: `sofik/set-score`, method: 'POST', body });
  }
}

export const api = new Api();