export interface ILoginField {
  value: string;
  showError: boolean;
  validate: () => boolean
}

export interface IUserData {
  id: number;
  name: string;
  isSofik: boolean;
  score: number;
  preparedToNextStage: boolean;
  stage?: 'beforeGame' | 'game' | 'afterGame',
}

export interface ITaskEntity {
  id: number;
  title: string;
  cost: number;
  completed: boolean;
}

export interface IChangeScoreOptions {
  amount: number;
  increase: boolean;
}