import { LoginResponse, Session } from '../@types';

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
