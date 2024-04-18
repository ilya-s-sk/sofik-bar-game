export interface ILoginField {
  value: string;
  showError: boolean;
  validate: () => boolean
}

export interface IUserData {
  id: number;
  name: string;
  isSofik: boolean;
}