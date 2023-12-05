import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class ReservationsListComponent implements OnInit {
  subscription: Subscription = new Subscription()
  reservations: Reservation[] = [];
  CLIENT_ID = 2 // normalement on le recupère depuis le Back ou l'url pour savoir le client connecter;
  edit = false;
  busModification = new FormControl('', Validators.required)
  dateModification = new FormControl('', Validators.required)

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.subscription.add(this.reservationService.getReservationObs()
      .subscribe(reservation => {
        this.reservations.push(reservation)
        this.reservationService.setReservationsList(this.reservations)
      }))
    this.subscription.add(this.reservationService.getAllClientReservations(this.CLIENT_ID)
      .subscribe((reservations)=>{
        this.reservations = reservations
        this.reservationService.setReservationsList(this.reservations)
      },
      (error) => {
        console.error('Error getting reservations:', error);
      }))
     
  }
  modifyReservation(selectedReservation: Reservation): void {
    this.reservations.forEach(item => item['edit'] = (selectedReservation === item))
  }
  apply(selectedReservation: Reservation): void {
    selectedReservation['busId'] = parseInt(this.busModification.value ?? '', 10);
    selectedReservation['travelDate'] = new Date(this.dateModification.value || '');
    selectedReservation['edit'] = false;
    this.subscription.add(this.reservationService.modifyReservation(selectedReservation)
    .subscribe(() => {
    //  Todo: mettre la logique quand le BO est prêt
    })
  )}
  deleteReservation(reservationId: number): void {
    this.reservations = this.reservations.filter(reservation => reservation.reservationId !== reservationId);
    this.subscription.add(this.reservationService.deleteReservation(reservationId)
      .subscribe(() => {
       //  Todo: mettre la logique quand le BO est prêt
      })
    )
  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe()
  }

}
