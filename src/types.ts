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
  stage?: 'beforeGame' | 'game' | 'afterGame',
  isAdmin?: boolean;
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
}