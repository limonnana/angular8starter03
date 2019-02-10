export interface Transaction {
  id: number;
  transactionDate: Date;
  title: string;
  amount: number;
  transactionType: 'DEBIT' | 'CREDIT';
  paymentType: 'CASH' | 'CHECK' | 'DEBIT' | 'CREDIT' | 'WIRE';
}
