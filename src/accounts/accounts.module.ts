import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialDesignModule } from 'src/material-design/material-design.module';

import { AccountsRoutingModule } from './accounts-routing.module';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromBuilders from './form-builders';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    AccountsRoutingModule
  ],
  providers: [...fromBuilders.builders],
  declarations: [...fromComponents.components, ...fromContainers.containers],
  entryComponents: [...fromComponents.entryComponents],
  exports: [...fromComponents.components, ...fromContainers.containers]
})
export class AccountsModule {}
