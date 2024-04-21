
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
  name: string;
  score: number;
}

export interface ICurrentDataResponse {
  id: number;
  name: string;
  stage: 'beforeGame' | 'game' | 'afterGame',
  isSofik: boolean;
  data: {
    tasks?: {}[],
    result?: {}[],
  }
}

export interface ISetScoreRequest {
  id: number;
  count: number;
}