import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {ResponseModel, UserService} from "../../Services/user.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myUser: any;

  constructor(private authService: SocialAuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.userData$
      .pipe(
        map((user: SocialUser|ResponseModel) => {
          if (user instanceof SocialUser) {
            return {
              email: 'test@test.com',
              ...user
            }
          } else {
            return user;
          }
        })
      ).subscribe((data: ResponseModel|SocialUser) =>{
        this.myUser =data;
    })
  }

}
