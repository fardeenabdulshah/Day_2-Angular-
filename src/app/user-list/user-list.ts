import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../userservices/user';
import { RouterModule } from '@angular/router';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserList implements OnInit {

  users: any[] = [];
  // service=Inject(UserService)
   constructor(private service: UserService) {}

  ngOnInit() {
    this.users = this.service.getUser();
  }

  deleteUser(i: number) {
    if (confirm('Do you want to delete user?')) {
      this.service.deleteUser(i);
      this.users = this.service.getUser();
    }
  }
}