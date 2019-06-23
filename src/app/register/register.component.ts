import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service-client';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: String;
  password: String;
  firstName: String;
  lastName: String;
  registerFailed: false;

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService) { }

  ngOnInit() {
  }

  register() {
    this.userService.createUser(this.username, this.password, this.firstName, this.lastName)
      .then(user => {
        return user.json();
      })
      .then(userData => {
        if (userData) {
          this.userService.assignSessionToUser(userData);
          this.router.navigate(['profile']);
        }
      });
  }

}
