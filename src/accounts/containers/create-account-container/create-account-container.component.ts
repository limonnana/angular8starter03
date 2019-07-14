import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-create-account-container',
  templateUrl: './create-account-container.component.html',
  styleUrls: ['./create-account-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountContainerComponent implements OnInit {
  accountTypes$: Observable<string[]> = of(['CHECKING', 'SAVINGS', 'CREDIT CARD', 'LOAN', 'MISC']);

  // snackbar is an Injectable component. Use DI to inject an instance of MatSnackBar
  // we will use this to open a simple snackbar to display the data
  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {}

  private openSnackBarForAccountCreate(account: Account) {
    // use the inject MatSnackBar instance to open a snack bar
    // display the title of the account and append: " was created"
    // dispay the snackbar for 2sec (2000ms)
    const message = `${account.title} was created!`;
    const action = 'Party!';
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  createAccount(account: Account) {
    // open a snackbar that tells the user their account was created
    this.openSnackBarForAccountCreate(account);
  }
}
