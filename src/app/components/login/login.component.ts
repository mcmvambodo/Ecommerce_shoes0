import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {SocialAuthService} from "angularx-social-login";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../Services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: SocialAuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState =>{
      if (authState){
        this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/profile')
      }else {
        this.router.navigateByUrl('/login');
      }
    })
  }

  signInWithGoogle() {

    this.userService.googleLogin();
  }

  login(form: NgForm):void {

    const email:string =this.email;
    const password: string = this.password;

    if (form.invalid)
      return;

    form.reset();
    this.userService.loginUser(email, password);
  }

}
