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

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {}

  login() {
    const user = this.userService.findUserByCredentials(this.username, this.password);
    if (user != null) {
      this.router.navigate(['profile', user.id]);
    }
  }

}
