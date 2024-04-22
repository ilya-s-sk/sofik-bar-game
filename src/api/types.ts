import { CODES } from './consts';

export interface IFetchOptions {
  url: string;
  method?: 'GET' | 'POST',
  body?: unknown;
}

export interface ILoginBody {
  login: string;
  password: string;
}

export interface ILoginResponse {
  result: string;
  id: number | null;
  code: number;
}

export interface IUserData {
  id: number;
  login: string;
  score: number;
  isSofik: number;
  currentCircle?: number;
  is_completed?: number;
}

export interface ICurrentDataResponse {
  id: number;
  name: string;
  stage: 'beforeGame' | 'game' | 'afterGame',
  isSofik: number;
  is_ready: number;
  isAdmin: number;
  data?: {
    tasks?: ITaskEntityFromCurrentData[],
  }
}

export interface ITaskEntityFromCurrentData {
  id: number,
  name: string,
  desc: string,
  cost: number,
  is_completed: 0 | 1,
}

export interface ISetScoreRequest {
  userId: number;
  count: number;
}

export interface ISetScoreResponse {
  code: number;
  count: number;
  id: number;
  result: string;
}

export interface ISetTaskRequest {
  userId: number;
  taskId: number;
}

export interface ISetTaaskResponse {
  code: CODES;
  result: string;
}

export interface IVisitBarResponse {
  code: CODES;
  result: string;
}

export interface IChangeStageResponse {
  code: CODES,
  result: string;
  data: unknown;
}

export interface IGetUsersResponse {
  users?: IUserData[];
}