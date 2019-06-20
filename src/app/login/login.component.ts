import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  failedLogin: Boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {}

  login() {
    const userId = this.userService.assignSessionToUser(this.username, this.password);
    if (userId) {
      console.log(userId);
      this.router.navigate(['profile', userId]);
    }
  }

}
