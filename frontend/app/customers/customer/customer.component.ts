import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public customer: Customer;
  @Input() customerId: string;

  constructor(public activeModal: NgbActiveModal, private events: EventsService, private store: CustomerService) {

  }

  ngOnInit() {
    if (this.customerId) {
      this.store.get(this.customerId).subscribe(c => {
        this.customer = c;
      })
    } else {
      this.customer = new Customer();
    }
  }

  save() {
    if (this.customerId) {
      this.store.update(this.customer).subscribe(r => {
        this.close();
      })
    } else {
      this.store.add(this.customer).subscribe(r => {
        this.close();
      })
    }
  }

  close() {
    this.activeModal.close();
  }

}
