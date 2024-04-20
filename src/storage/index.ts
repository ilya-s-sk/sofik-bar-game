import { IUserData } from "~/types";

const USER_DATA_LS_KEY = 'sofik-bar-game-user-data-ls-key';
export const SHOW_TASKS_LS_KEY = 'sofik-bar-game-show-tasks-status'

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

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setUserData(userData: IUserData) {
    this.setItem<IUserData>(USER_DATA_LS_KEY, userData);
  }

  getUserData(): IUserData | null {
    const userDataStr = this.getItem(USER_DATA_LS_KEY);
    if (!userDataStr) {
      return null;
    }

    try {
      const userData = JSON.parse(userDataStr);
      return userData
    } catch {
      return null;
    }
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
}

export const storageEntry = new StorageEntry();