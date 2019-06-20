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
    //const userId = this.userService.findUserByCredentials(this.username, this.password);   
    this.userService.findUserByCredentials(this.username, this.password)
      .then(user => {
        if (user) {
          this.userService.assignSessionToUser(user);
          this.router.navigate(['profile', user["_id"]]);    
        }
      }); 
    /*if (userId) {
      this.router.navigate(['profile', userId]);
    }
  }*/
}

}
