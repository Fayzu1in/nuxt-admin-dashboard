
export interface IUser {
  id: number;
  name: string;
  surname: string;
  phone: string;
  position: string;
  email: string;
  status: string;
  date: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}