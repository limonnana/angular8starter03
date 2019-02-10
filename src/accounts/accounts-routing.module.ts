import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: fromContainers.AccountsListContainerComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: fromContainers.CreateAccountContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {}
