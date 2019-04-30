import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Observable, Subscription } from 'rxjs';
import { Customer } from '../model/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'src/app/shared/components/confirm.component';
import { CustomerComponent } from '../customer/customer.component';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {


  serviceSubscription: Subscription;
  eventSubscription: Subscription;
  customers: Customer[];

  constructor(private store: CustomerService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.eventSubscription = this.store.customerChanged$.subscribe(() => {
      this.getData();
    })
    this.getData();
  }

  ngOnDestroy(): void {
    this.unsubscribeDataService();
    this.eventSubscription.unsubscribe();
  }

  getData() {
    this.unsubscribeDataService();
    this.serviceSubscription = this.store.getAll().subscribe(r => {
      this.customers = r;
    });
  }

  update(customer: Customer) {
    var modelRef = this.modalService.open(CustomerComponent);
    modelRef.componentInstance.customerId = customer._id;
  }

  delete(customer: Customer) {
    var modelRef = this.modalService.open(ConfirmComponent);
    modelRef.result.then(c => {
      this.store.delete(customer._id).subscribe();
    }, r => {

    });
    modelRef.componentInstance.message = `Are you sure you want to delete customer with email "${customer.email}" ?`;

  }

  unsubscribeDataService() {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

}
