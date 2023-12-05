import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class ReservationsListComponent implements OnInit {
  unsubscribe$: Subject<boolean> = new Subject
  reservations: Reservation[] = [];
  CLIENT_ID = 2 // normalement on le recupère depuis le Back ou l'url pour savoir le client connecter;
  edit = false;
  ButtonLabel = 'Modify';
  busModification = new FormControl('', Validators.required)
  dateModification = new FormControl('', Validators.required)
  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservationObs()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(resrvation => {
      this.reservations.push(resrvation)
    })
    
    this.reservationService.getAllClientReservations(this.CLIENT_ID).pipe(takeUntil(this.unsubscribe$))
      .subscribe((reservations)=>{
        this.reservations = reservations
      },
      (error) => {
        console.error('Error getting reservations:', error);
      }
      )
   
  }

  modifyReservation(slectedReservation: Reservation): void {
    this.reservations.forEach(item=>{
      item['edit'] = false;
      if(slectedReservation === item){
        item['edit'] = true;
      }
    })
  }
  apply(slectedReservation: Reservation){
    this.reservations.forEach(item=>{
      if(slectedReservation === item){
        item['busId'] = parseInt(this.busModification.value ?? '', 10);
        item['travelDate'] = new Date(this.dateModification.value ? this.dateModification.value : '');
      }
      item['edit'] = false;
    })
  }

  deleteReservation(reservationId: number): void {
    this.reservations = this.reservations.filter(reservation => reservation.reservationId !== reservationId);
  }

  ngOnDestroy(){
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()

  }

}
