import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-account-details-dialog',
  templateUrl: './account-details-dialog.component.html',
  styleUrls: ['./account-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDetailsDialogComponent {
  constructor(
    // MatDialogRef of this dialog component
    // gives us ref access to the dialog so we can close it and return data as necessar
    // it contains its own set of lifecycle hooks for this dialog component
    private dialogRef: MatDialogRef<AccountDetailsDialogComponent>,
    // when the dialog is opened it is passed an account object
    // this injects that data so we can view the Account details
    // this is an object and can be passed multiple pieces of data
    @Inject(MAT_DIALOG_DATA) public account: Account
  ) {}

  onCloseClick() {
    // close the dialog
    // if you need to pass data back to the calling component,
    // you pass it to the close method
    this.dialogRef.close();
  }
}
