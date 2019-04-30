import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomersComponent } from './customers.component';
import { CustomerComponent } from './customer/customer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
 
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule
  ],
  declarations: [CustomerListComponent, CustomersComponent, CustomerComponent],
  entryComponents:[CustomerComponent]
})
export class CustomersModule { }
