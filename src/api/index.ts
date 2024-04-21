import { useDialogStore } from "~/store/dialog";
import { ICurrentDataResponse, IFetchOptions, ILoginBody, IUserData, ILoginResponse, ISetScoreRequest, ISetTaskRequest } from './types'

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

  async setTaskStatus(body: ISetTaskRequest) {
    return await this.fetch({ url: `user/set-task`, method: 'POST', body })
  }

  async finishStage(id: number) {
    return await this.fetch({ url: 'user/set-ready', method: 'POST', body: { userId: id } });
  }

  async sofikGetUsers() {
    return this.fetch<IUserData[]>({ url: 'sofik/get-users', });
  }

  async sofikSetScore(body: ISetScoreRequest) {
    return this.fetch({ url: `sofik/set-score`, method: 'POST', body });
  }
}

export const api = new Api();