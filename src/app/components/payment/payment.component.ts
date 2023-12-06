import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of, switchMap } from 'rxjs';
import { Bus } from '../../models/bus.model';
import { Reservation } from '../../models/reservation.model';
import { BusService } from '../../services/bus.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  showPaypalContent = false
  showCreditCardContent = false
  totalPrice: Observable<number> | undefined
  totalNormalPrice = 0
  discountedPrice = 0
  buses: Bus[] = []
  filtredbuses: Bus[] = []
  email = new FormControl('', Validators.required)
  nCard = new FormControl('', Validators.required)
  expiredDate = new FormControl('', Validators.required)
  constructor(private reservationService: ReservationService, private busService: BusService) { }

  ngOnInit(): void {
   
  this.totalPrice = this.reservationService.getReservationsList()
    .pipe(
      switchMap((reservations: Reservation[])=>{
        return this.busService.getBuses().pipe(
          switchMap((buses: Bus[])=>{
            this.totalNormalPrice = this.calculateTotalPrice(reservations,buses);
            return of(this.totalNormalPrice);
          })
        )
      })
    )
  }

  onPaypal(): void{
    this.showPaypalContent = true
    this.showCreditCardContent = false
    this.discountedPrice = this.applyDiscount(this.totalNormalPrice);
  }
  
  onCreditCard(): void {
    this.showCreditCardContent = true
    this.showPaypalContent = false
  }

  private calculateTotalPrice(reservations: Reservation[], buses: Bus[]): number {
    return reservations.reduce((total, reservation) => {
      const bus = buses.find((b) => b.numero === reservation.busId);
      return total + (bus ? bus.routePrice : 0);
    }, 0);
  }

  private applyDiscount(totalPrice: number): number {
    return (totalPrice - totalPrice * 0.05);
  }

}
