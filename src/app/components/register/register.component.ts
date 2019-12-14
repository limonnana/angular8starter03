import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { ValidationService } from '../../services/validation.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
//import { Role } from '../entities/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  login: Login;
  error: string;
  email: string = '';

  constructor(
  private userService: UserService,
  private formBuilder: FormBuilder,
  private router: Router,
  private validationService: ValidationService
) {
  this.createForm();
}
  ngOnInit() {
  }

  register() {
    const loginFromForm: Login = this.registerForm.value;
    this.error = this.validationService.validateRegisterForm(loginFromForm);
    if (this.error != null && this.error.length>2) {
      console.log('error from form: ' + this.error);
      return;
    } else {
      this.userService.register(loginFromForm).subscribe(data => {
        this.router.navigate(['login']);
      });
    }
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: [''],
      retypePassword: ['']
    });
  }

  
  public isEmailTaken() {
    this.error = '';
   
    const userFromForm: Login = this.registerForm.value;
    let email: string = userFromForm.email;
    this.userService.isEmailTaken(userFromForm).subscribe(data => {
      if (data.result === 'true') {
        this.error =
          'Email already registered, please login or use forgot password ';
    } 
    });
  }

}
