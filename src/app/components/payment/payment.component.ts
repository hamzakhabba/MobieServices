import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  showPaypalContent = false
  showCreditCardContent = false
  email = new FormControl('', Validators.required)
  nCard = new FormControl('', Validators.required)
  expiredDate = new FormControl('', Validators.required)
  constructor() { }

  ngOnInit(): void {
  }

  onPaypal(): void{
    this.showPaypalContent = true
    this.showCreditCardContent = false
  }
  
  onCreditCard(): void {
    this.showCreditCardContent = true
    this.showPaypalContent = false
  }
    

}
