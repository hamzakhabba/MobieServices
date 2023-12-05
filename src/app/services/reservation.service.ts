import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
   reservationObs$: Subject<Reservation> = new Subject() 
  // private apiUrl = 'assets/data/reservations.json';

  getReservationObs(): Observable<Reservation>{
    return this.reservationObs$.asObservable();
  }

  setReservationObs(reservation: Reservation){
    this.reservationObs$.next(reservation)
  }

  constructor() { }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return of(reservation);
  }

}
