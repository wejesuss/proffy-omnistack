import { LoginResponse } from '../pages/Login';

export function logout(): void {
  localStorage.clear();
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

export function login({ token, user }: LoginResponse, remember: boolean): void {
  const now = new Date();

  localStorage.setItem('user', btoa(JSON.stringify(user)));
  if (remember) {
    localStorage.setItem('remember', 'true');

    now.setDate(now.getDate() + 3);
    document.cookie = `token=${token}; expires=${now.toUTCString()}`;
  } else {
    localStorage.setItem('remember', 'false');

    now.setDate(now.getDate() + 1);
    document.cookie = `token=${token}; expires=${now.toUTCString()}`;
  }
}
