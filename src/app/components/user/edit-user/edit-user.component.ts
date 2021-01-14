import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ValidationService } from 'src/app/services/validation.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

   user: User = new User();
   editForm: FormGroup = null;
   error: string = '';
   

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.editForm = this.buildForm();
    let id = this.route.snapshot.params.id;
    console.log(' the id is: ' + id);

    this.userService.getUserById(id)
      .subscribe( data => {
        this.user.name = data.name;
        this.user.lastName = data.lastName;
        this.user.phone = data.phone;
        this.user.email = data.email;
        this.user.id = id;
        this.editForm.setValue(this.user);
    });

  }

  editUser() {
    const userFromForm: User = this.editForm.value;
    this.error = this.validationService.validateNewUserForm(userFromForm);
    if (this.error != null && this.error.length>2) {
      console.log('error from form: ' + this.error);
      return;
    } else {
      this.userService.updateUser(userFromForm).subscribe(data => {
        this.router.navigate(['users']);
       console.log('the answer from server is: ' + data.message);
     });
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      id:[null]
    });
  }

}
