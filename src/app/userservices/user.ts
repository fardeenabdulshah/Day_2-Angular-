import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

private key = 'user';
  register(data: any) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getUser() {
    const user = localStorage.getItem(this.key);
    return user ? JSON.parse(user) : null;
  }

  login(email: string, password: string): boolean {
    const user = this.getUser();
    if (!user) return false;

    return user.user.email === email && user.user.Password === password;
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.key);
  }

  logout() {
    localStorage.removeItem(this.key);
  }
}