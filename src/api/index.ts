import { useDialogStore } from "~/store/dialog";
import { 
  ICurrentDataResponse, 
  IFetchOptions, ILoginBody, 
  IUserData, 
  ILoginResponse, 
  ISetScoreRequest, 
  ISetTaskRequest, 
  ISetScoreResponse, 
  IVisitBarResponse, 
  IChangeStageResponse, 
  ISetTaaskResponse,
  IGetUsersResponse
} from './types'

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
        const { status, statusText } = response
        throw { status, statusText }
      }

      const result = await response.json();

      return result;
    } catch (err) {
      dialogStore.showErrorDialog(err);
      return null;
    }
  }

  async login(body: ILoginBody) {
    return await this.fetch<ILoginResponse>({ url: 'user/login', method: 'POST', body });
  }

  async getUserData(id: number) {
    return await this.fetch<ICurrentDataResponse>({ url: `user/get_current_data?${id}` })
  }

  async setTaskStatus(body: ISetTaskRequest) {
    return await this.fetch<ISetTaaskResponse>({ url: `user/set_task_complete`, method: 'POST', body })
  }

  async changeStage(id: number, bar_id: number) {
    return await this.fetch<IChangeStageResponse>({ 
      url: 'user/visit_bar',
      method: 'POST',
      body: { player_id: id, bar_id },
    });
  }

  async getUsers() {
    return this.fetch<IGetUsersResponse>({ url: 'get_users', });
  }

  async sofikStartGame() {
    return this.fetch({ url: 'system/start_new_game', method: 'POST' });
  }

  async sofikSetScore(body: ISetScoreRequest) {
    return this.fetch<ISetScoreResponse>({ url: `sofik/set-score`, method: 'POST', body });
  }

  async systemForceNextCircle() {
    return this.fetch({ url: 'system/force_next_circle', method: 'POST' });
  }

  async systemDeleteUser(player_id: number) {
    return this.fetch({ url: 'system/delete_user', method: 'POST', body: { player_id } })
  }
}

export const api = new Api();