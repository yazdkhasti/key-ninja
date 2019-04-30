import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  ok() {
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.dismiss();
  }

}
