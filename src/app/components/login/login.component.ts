import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import {Router} from "@angular/router";
import {CredentialsService } from '../../services/credentials.service';
import { Credentials } from '../../models/credentials';
import { ValidationService } from '../../services/validation.service';
import { Role } from '../../models/role';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  wrongCredentials: string | undefined;
  loginForm!: FormGroup;
  user: User;
  credentials = new Credentials('', '',  Role.USER);
  isAuthenticated$: Observable<boolean>;
  isAdmin$: Observable<boolean>

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private credentialsService: CredentialsService,
   // private store: Store<AppState>,
   // private storageService: LocalStorageService
    )
     {
      this.createForm();
     }

  ngOnInit() {
   // this.storageService.testLocalStorage();
   // this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
   // this.isAdmin$ = this.store.pipe(select(selectIsAdmin));
  }login() {
    
    this.loginService.authenticate(this.loginForm.value).subscribe(data => {
      this.user = data;
      console.log('User Logged: ' + JSON.stringify(this.user));
      if(this.user.token){
            this.credentials.username = this.user.email;
            this.credentials.token = this.user.token;
            this.credentials.role = this.user.role;
            this.credentialsService.setCredentials(this.credentials);
            this.router.navigate(['home']);
      }else{
        this.wrongCredentials = "wrong credentials";
     }
    });
  }



  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],// Validators.required],
      password: ['']//, Validators.required],
      //rememberMe: false
    });
  }

}
