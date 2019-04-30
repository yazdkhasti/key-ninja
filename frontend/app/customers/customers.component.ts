import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomerComponent } from './customer/customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    
  }


  open() {
    var modelRef = this.modalService.open(CustomerComponent);
  }


}
