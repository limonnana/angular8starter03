import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountDetailsDialogComponent } from './account-details-dialog/account-details-dialog.component';

export const components: any[] = [
  AccountsListComponent,
  CreateAccountComponent,
  AccountDetailsDialogComponent
];

export const entryComponents: any[] = [AccountDetailsDialogComponent];

export * from './accounts-list/accounts-list.component';
export * from './create-account/create-account.component';
export * from './account-details-dialog/account-details-dialog.component';
