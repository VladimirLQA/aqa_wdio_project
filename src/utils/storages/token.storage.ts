import { ILoginResponse } from '../../types/user.types.js';

interface UsersToken {
  username: string;
  token: string;
}

export class TokenStorage {
  private users: UsersToken[] = [];
  private static instance: TokenStorage;

  constructor() {
    if (TokenStorage.instance) {
      return TokenStorage.instance;
    }
    return TokenStorage.instance = this;
  }

  setToken(tokenResponse: string, username: string | null = null) {
    username
      ? this.findUserByName(username).token = tokenResponse
      : this.users[this.users.length - 1].token = tokenResponse;
  }

  setUser(username: string, token: string) {
    this.users.push({ username, token });
  }

  getToken(username?: string) {
    return username
      ? this.findUserByName(username).token
      : this.users[this.users.length - 1].token;
  }

  removeToken(username?: string) {
    username
      ? this.findUserByName(username).token = ''
      : this.users[this.users.length - 1].token = '';
  }

  private findUserByName(username: string | null) {
    const idx = this.users.findIndex((user) => user.username === username);
    console.log('idx of set user -> ', idx);
    return this.users[idx];
  }
}
