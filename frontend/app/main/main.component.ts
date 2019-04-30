import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: User;

  constructor(private usersService: UsersService, private auth: AuthService, private route: ActivatedRoute, private router: Router) {
    this.router.navigate(["./customers"], { relativeTo: this.route, skipLocationChange: true });
  }

  ngOnInit() {
    this.usersService.get().subscribe((user) => {
      this.user = user;
    })
  }

  logout() {
    this.usersService.logout().subscribe(() => {
      this.auth.navigateLogin();
    })
  }

}
