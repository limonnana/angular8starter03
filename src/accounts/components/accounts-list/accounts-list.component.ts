import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsListComponent implements OnInit, AfterViewInit, OnDestroy {
  private _accountsDataSource: MatTableDataSource<
    Account
  > = new MatTableDataSource<Account>();
  private _unsubscribe = new Subject<void>();

  filterTableFormGroup: FormGroup = null;

  @Input() set accounts(accounts: Account[]) {
    if (!isNullOrUndefined(accounts)) {
      // set data on data source to input accounts
      this._accountsDataSource.data = accounts;
    }
  }

  get accountsDataSource(): MatTableDataSource<Account> {
    return this._accountsDataSource;
  }

  get columns(): string[] {
    // return a string array of the columns in the table
    // the order of these values will be the order your columns show up in
    return ['id', 'title', 'opened', 'currBalance', 'info'];
  }

  // add ViewChild support for the table MatPagionator
  // allows us to register the paginator with the MatTable
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  // add ViewChild support fot the table column sorting
  // allows us to register the table column sorting with the Mat Table
  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @Output() viewAccountDetails: EventEmitter<Account> = new EventEmitter<
    Account
  >();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // build the filter form group
    // add a entry for the user to enter filter text
    this.filterTableFormGroup = this.fb.group({
      filter: [null, null]
    });
    // subscribe to changes that occur on the filterTableFormGroup.filter form control
    // when these changes occur, filter the results of the table
    this.filterTableFormGroup.controls['filter'].valueChanges
      .pipe(
        debounceTime(1500), // wait 1.5sec for the user to finish entering info before applying filter
        distinctUntilChanged(), // only apply the filter if the entered value is distinct
        takeUntil(this._unsubscribe) // once _unsubscribe is applied, stop the listener
      )
      .subscribe((value: string) => {
        if (!isNullOrUndefined(value)) {
          // apply the filter to the data source
          value = value.trim().toLowerCase();
          this.accountsDataSource.filter = value;
        }
      });
  }

  ngAfterViewInit() {
    // register paginator & sort view shildren with the table data source
    this.accountsDataSource.paginator = this.paginator;
    this.accountsDataSource.sort = this.sort;
  }

  ngOnDestroy() {
    // when the component is destroyed, call to _unsubscribe
    // this will stop any active listeners on the component and free up resources
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  // adds tracking for the data source for faster filtering, and sorting
  trackByFn(account: Account) {
    return account.id;
  }

  onViewAccountDetails(account: Account) {
    // when clicked, output an event to the parent container to view the account details
    // we do this so that the container can be responsible for how it wants to process this event
    // i.e. open a dialog or maybe route to a details page
    this.viewAccountDetails.emit(account);
  }
}
