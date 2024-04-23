export interface ILoginField {
  value: string;
  showError: boolean;
  validate: () => boolean
}

export interface IGameUserData {
  id: number;
  name: string;
  isSofik: boolean;
  score: number;
  isReady: boolean;
  current_circle: number;
  stage?: 'beforeGame' | 'game' | 'afterGame',
}

export interface ICurrentBar {
  address: string;
  name: string;
  id: number;
}

export interface ITaskEntity {
  id: number;
  title: string;
  desc: string;
  cost: number;
  completed: boolean;
}

export interface IChangeScoreOptions {
  amount: number;
}

export interface IGameOptions {
  showTasks: boolean;
  isReady: boolean;
}