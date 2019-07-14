import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Transaction } from 'src/app/models/transaction.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private _lastTransaction: Transaction = null;

  @Input() set lastTransaction(txn: Transaction) {
    if (!isNullOrUndefined(txn) && (isNullOrUndefined(this._lastTransaction) || this._lastTransaction.id !== txn.id)) {
      this._lastTransaction = txn;
    }
  }
  get lastTransaction(): Transaction {
    return this._lastTransaction;
  }

  constructor() {}

  ngOnInit() {}
}
