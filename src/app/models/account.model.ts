import { Transaction } from './transaction.model';

export interface Account {
  id: number;
  title: string;
  accountType: 'CHECKING' | 'SAVINGS' | 'CREDIT CARD' | 'LOAN' | 'MISC';
  opened: Date;
  transactions: Transaction[];
  currBalance: number;
  active: boolean;
}
