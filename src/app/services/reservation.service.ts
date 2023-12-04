import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // private apiUrl = 'assets/data/reservations.json';

  constructor() { }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return of(reservation);
  }

}
