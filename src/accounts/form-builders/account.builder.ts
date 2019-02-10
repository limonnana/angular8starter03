import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class AccountBuilder {
  constructor(private fb: FormBuilder) {}

  /**
   * Build and return a `FormGroup` with the required fields and
   * validation for the Account creation
   */
  public build(): FormGroup {
    return this.fb.group({
      id: [null, null],
      title: [null, Validators.required],
      accountType: [null, Validators.required],
      opened: [null, Validators.required],
      currBalance: [0.0, Validators.required],
      active: [true, Validators.required]
    });
  }
}
