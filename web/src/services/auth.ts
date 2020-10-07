import {
  LoginResultStatus,
  LoginResponse,
  LoginSuccess,
  RoutesPath,
} from '../@types';
import { logout } from '../utils';
import api from './api';

export async function signIn(credentials: {
  email: string;
  password: string;
}): Promise<LoginSuccess | LoginResultStatus> {
  try {
    const res = await api.post<LoginResponse>(RoutesPath.login, credentials);
    const { token, user } = res.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    return { token, user };
  } catch (reason) {
    return { result: false, error: reason };
  }
}

export function signOut(): void {
  logout();
}
