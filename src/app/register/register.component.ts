import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service-client';


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

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  register() {
    this.userService.createUser(this.username, this.password, this.firstName, this.lastName, null)
      .then(user => {
        return user.json();
      })
      .then(userData => {
        if (userData) {
          this.userService.assignSessionToUser(userData);
          this.router.navigate(['profile', userData["_id"]]);
        }
      });
  }

}
