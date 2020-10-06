import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth: boolean = false;
  private SERVER_URL: string = environment.SERVER_URL;
  private user;
  authState$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth);
  userData$:BehaviorSubject<SocialUser | ResponseModel> = new BehaviorSubject<SocialUser>(null);

  constructor(private authService:SocialAuthService,
              private httpClient: HttpClient) {

    authService.authState.subscribe((user:SocialUser) =>{
      if (user!== null){
        this.auth =true;
        this.authState$.next(this.auth);
        this.userData$.next(user);
      }
    });
  }

  //Login User with email and password
  loginUser(email:string, password: string){
    this.httpClient.post(`${this.SERVER_URL}/auth/login`, {email, password})
      .subscribe((data:ResponseModel):void =>{
        this.auth = data.auth;
        this.authState$.next(this.auth);
        this.userData$.next(data);

      })
  }

  // Google authentification
  googleLogin():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  //Logout
  logout(){
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth)
  }
}

export interface ResponseModel{
  token: string
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
}
