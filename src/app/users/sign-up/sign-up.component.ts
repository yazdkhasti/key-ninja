import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { UsersService } from '../services/users.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  vm: Login;
  errorMsg: string;
  constructor(private userService: UsersService, private auth: AuthService) {
    this.vm = new Login();
  }

  ngOnInit() {

  }


  signUp() {
    this.userService.signUp(this.vm).subscribe(() => {
      this.userService.login(this.vm).subscribe(() => {
        this.auth.navigateMain();
      })
    }, (r) => {
      this.errorMsg = r.error || "an error occured.";
    });
  }
}
