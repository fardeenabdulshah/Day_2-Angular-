// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {

// private key = 'user';
//   register(data: any) {
//     localStorage.setItem(this.key, JSON.stringify(data));
//   }

//   getUser() {
//     const user = localStorage.getItem(this.key);
//     return user ? JSON.parse(user) : [];
//   }
//   addUser(user: any) {
//     const users = this.getUser();
//     users.push(user);
//     localStorage.setItem(this.key, JSON.stringify(users));
//   }
//   deleteUser(index: number) {
//     const users = this.getUser();
//     users.splice(index, 1);
//     localStorage.setItem(this.key, JSON.stringify(users));
//   }


//   login(email: string, password: string): boolean {
//     const user = this.getUser();
//     if (!user) return false;

//     return user.user.email === email && user.user.Password === password;
//   }
//   isLoggedIn(): boolean {
//     return !!localStorage.getItem(this.key);
//   }

//   logout() {
//     localStorage.removeItem(this.key);
//   }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private key = 'users'; 

  // register(data: any) {
  //   localStorage.setItem(this.key, JSON.stringify([data])); 
  // }

  getUser() {
    const user = localStorage.getItem(this.key);
    const parsed = user ? JSON.parse(user) : [];

    return Array.isArray(parsed) ? parsed : [parsed]; 
  }

  addUser(user: any) {
    const users = this.getUser();
    users.push(user);
    localStorage.setItem(this.key, JSON.stringify(users));
  }

  deleteUser(index: number) {
    const users = this.getUser();
    users.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(users));
  }

  login(email: string, password: string): boolean {
    const users = this.getUser();

    return users.some((u: any) =>
      u.email === email && u.Password === password
    );
  }

  isLoggedIn(): boolean {
    return this.getUser()?.length > 0;
  }

}