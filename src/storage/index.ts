import { IGameUserData, ITaskEntity, IGameOptions } from "~/types";

const USER_DATA_LS_KEY = 'sofik-bar-game-user-data';
const TASKS_LIST_LS_KEY= 'sofik-bar-game-tasks-list';
const CURRENT_BAR_LS_KEY = 'sofik-bar-game-current-bar-name';
const SHOW_TASKS_LS_KEY = 'sofik-bar-game-show-tasks-status';
const GAME_OPTIONS_LS_KEY = 'sofik-bar-game-game-options';

class StorageEntry {
  setItem<T>(key: string, value: T) {
    const preparedValue = typeof value === 'object' 
      ? JSON.stringify(value) 
      : String(value);

    localStorage.setItem(key, preparedValue);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  getJsonItem<T>(key: string): T | null {
    const json = this.getItem(key);
    if (!json) return null;

    try {
      const data = JSON.parse(json);
      return data;
    } catch {
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setUserData(userData: IGameUserData) {
    this.setItem<IGameUserData>(USER_DATA_LS_KEY, userData);
  }

  getUserData() {
    return this.getJsonItem<IGameUserData>(USER_DATA_LS_KEY);
  }

  setTasksList(tasksList: ITaskEntity[]) {
    this.setItem<ITaskEntity[]>(TASKS_LIST_LS_KEY, tasksList);
  }

  getTasksList() {
    return this.getJsonItem<ITaskEntity[]>(TASKS_LIST_LS_KEY);
  }

  setCurrentBarName(name: string) {
    this.setItem(CURRENT_BAR_LS_KEY, name);
  }

  getCurrentBarName() {
    return this.getItem(CURRENT_BAR_LS_KEY);
  }

  setTasksVisibilityStatus() {
    this.setItem<string>(SHOW_TASKS_LS_KEY, '1');
  }

  getTasksVisibilityStatus(): boolean {
    return Boolean(this.getItem(SHOW_TASKS_LS_KEY));
  }

  removedTasksVisiblityStatus() {
    this.removeItem(SHOW_TASKS_LS_KEY);
  }

  setGameOptions(gameOptions: IGameOptions) {
    this.setItem(GAME_OPTIONS_LS_KEY, gameOptions);
  }

  getGameOptions() {
    return this.getJsonItem<IGameOptions>(GAME_OPTIONS_LS_KEY);
  }
}

export const storageEntry = new StorageEntry();