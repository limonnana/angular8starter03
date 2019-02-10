import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Account } from 'src/app/models/account.model';
import * as fromBuilders from 'src/accounts/form-builders';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountComponent implements OnInit {
  private _accountTypes: string[] = null;

  accountFormGroup: FormGroup = null;

  @Input() set accountTypes(types: string[]) {
    if (!isNullOrUndefined(types)) {
      this._accountTypes = types;
    }
  }
  get accountTypes(): string[] {
    return this._accountTypes;
  }

  @Output() createAccountEmitter: EventEmitter<Account> = new EventEmitter<
    Account
  >();

  constructor(private accountBuilder: fromBuilders.AccountBuilder) {}

  ngOnInit() {
    // build the account form group using the AccountBuilder
    this.accountFormGroup = this.accountBuilder.build();
  }

  onSubmit(account: Account) {
    // emit the user-submitted account to the calling container
    this.createAccountEmitter.emit(account);
  }
}
