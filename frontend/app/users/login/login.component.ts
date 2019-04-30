import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Login } from '../model/login';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  vm: Login;
  errorMsg: string;

  constructor(private usersService: UsersService, private auth: AuthService, private router: Router) {
    if (this.usersService.isAuthenticated) {
      this.goToMain();
    }
    this.vm = new Login();
  }

  ngOnInit() {

  }

  login() {
    this.usersService.login(this.vm).subscribe((r) => {
      if (r.error) {
        this.errorMsg = r.error;
      } else {
        this.goToMain();
      }
    }, (r) => {
      this.errorMsg = "an error occured";
    });

  }

  goToMain() {
    this.auth.navigateMain();
  }

}
