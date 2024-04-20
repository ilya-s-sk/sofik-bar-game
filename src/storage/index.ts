import { IUserData } from "~/types";

const USER_DATA_LS_KEY = 'user-data-ls-key';

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
}

export const storageEntry = new StorageEntry();