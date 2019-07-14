import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

import { Account } from 'src/app/models/account.model';
import { Transaction } from 'src/app/models/transaction.model';
import * as fromComponents from 'src/accounts/components';

@Component({
  selector: 'app-accounts-list-container',
  templateUrl: './accounts-list-container.component.html',
  styleUrls: ['./accounts-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsListContainerComponent implements OnInit {
  accounts$: Observable<Account[]> = of([
    <Account>{
      id: 1,
      title: 'Primary Checking',
      accountType: 'CHECKING',
      opened: new Date('2019-01-01'),
      currBalance: 1500,
      active: true
    },
    <Account>{
      id: 2,
      title: 'Primary Savings',
      accountType: 'SAVINGS',
      opened: new Date('2019-01-01'),
      currBalance: 10000,
      active: true
    },
    <Account>{
      id: 3,
      title: 'Credit Card',
      accountType: 'CREDIT CARD',
      opened: new Date('2019-01-01'),
      currBalance: 150,
      active: true
    }
  ]);
  loading$: Subject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // wait 2sec then set loading$ to false
    setTimeout(() => {
      this.loading$.next(false);
    }, 2000);
  }

  viewAccountDetails(account: Account) {
    // add transactions
    account.transactions = [
      <Transaction>{
        id: 1,
        title: 'Gas',
        transactionDate: new Date(),
        amount: 25.45,
        transactionType: 'CREDIT',
        paymentType: 'DEBIT'
      },
      <Transaction>{
        id: 2,
        title: 'Coffee',
        transactionDate: new Date(),
        amount: 4.67,
        transactionType: 'CREDIT',
        paymentType: 'CREDIT'
      },
      <Transaction>{
        id: 3,
        title: 'Receive Rent Payment',
        transactionDate: new Date('2019-01-14'),
        amount: 750,
        transactionType: 'DEBIT',
        paymentType: 'CHECK'
      }
    ];
    // open the account-details-dialog component to display the account details
    const dialogRef = this.dialog.open(fromComponents.AccountDetailsDialogComponent, {
      data: account,
      width: '75%'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('DIALOG CLOSED');
    });
  }
}
