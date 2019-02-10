import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  lastTransaction$: Observable<Transaction> = of(<Transaction>{
    id: 1,
    transactionDate: new Date(),
    title: 'Gas',
    amount: 25.0,
    transactionType: 'CREDIT',
    paymentType: 'DEBIT'
  });

  constructor() {}

  ngOnInit() {}
}
