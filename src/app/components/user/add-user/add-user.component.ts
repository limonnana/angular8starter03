import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  newUserFormGroup: FormGroup = null;
  error: string = '';
  email: string = '';
  isEmailAlreadyTaken: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private validationService: ValidationService
    ) { }

  ngOnInit() {
    this.newUserFormGroup = this.buildForm();
  }

  addUser() {
    const userFromForm: User = this.newUserFormGroup.value;
    this.error = this.validationService.validateNewUserForm(userFromForm);
    if (this.error != null && this.error.length>2) {
      console.log('error from form: ' + this.error);
      return;
    } else {
      this.userService.save(userFromForm).subscribe(data => {
        this.router.navigate(['users']);
       console.log('the answer from server is: ' + data.name);
     });
    }
  }


   buildForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required]
    });
  }

  public isEmailTaken() {
    this.error = '';
    const userFromForm = this.newUserFormGroup.value;
    let email: string = userFromForm.email;
    let login = new Login(email, '', '', false);
    this.userService.isEmailTaken(login).subscribe(data => {
      if (data.result === 'true') {
        this.isEmailAlreadyTaken = true;
        this.error = 'this email is alredy registered, please login or reset the password';
    } 
    });
  }
  

}

