import { LoginResponse, Session, User } from '../@types';
import api from '../services/api';

export function logout(): void {
  localStorage.clear();
  document.cookie = `${Session.token}=; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}

export function login({ token, user }: LoginResponse, remember: boolean): void {
  const now = new Date();

  localStorage.setItem(Session.user, btoa(JSON.stringify(user)));
  if (remember) {
    localStorage.setItem(Session.remember, 'true');

    now.setDate(now.getDate() + 3);
    document.cookie = `${Session.token}=${token}; expires=${now.toUTCString()}`;
  } else {
    localStorage.setItem(Session.remember, 'false');

    now.setDate(now.getDate() + 1);
    document.cookie = `${Session.token}=${token}; expires=${now.toUTCString()}`;
  }
}

export function getCookie(key: string): string {
  const strCookie =
    document.cookie.split(';').find((cookie) => {
      return cookie.includes(key);
    }) || '';

  const [, value] = strCookie
    ?.split('=')
    .map((cookieValue) => cookieValue.trim());

  return value;
}

export function getSessionUser(): User | null {
  const strCryptedUser = localStorage.getItem(Session.user);
  const token = getCookie(Session.token);
  let strUser = null;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  if (strCryptedUser) {
    strUser = atob(strCryptedUser);
    return JSON.parse(strUser);
  }

  return strUser;
}
