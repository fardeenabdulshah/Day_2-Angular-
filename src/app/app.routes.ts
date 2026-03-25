import { Routes } from '@angular/router';
import { Loginform } from './loginform/loginform';
import { UserList } from './user-list/user-list';

export const routes: Routes = [
  { path: '', component: Loginform },
  { path: 'users', component: UserList },
];
