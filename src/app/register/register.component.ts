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
    this.userService.createUser(this.username, this.password, this.firstName, this.lastName)
      .then(user => {
        if (user) {
          this.userService.assignSessionToUser(user);
          this.router.navigate(['login', user["_id"]]);
        }
      });
    /*if (userId) {
      this.router.navigate(['profile', userId]);
    }
  }*/
  }

}
