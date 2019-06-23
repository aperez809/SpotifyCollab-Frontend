import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service-client';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  failedLogin = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService) { }

  ngOnInit() {}

  login() {
    this.failedLogin = false;
      this.userService.findUserByCredentials(this.username, this.password)
        .then(user => {
          if (user) {
            this.userService.assignSessionToUser(user);
            this.router.navigate(['profile']);
          }
        }).catch((err: Error) => {
        console.log(err)
        this.failedLogin = true;
        alert("Incorrect username or password, please try again");
      });

}

}
