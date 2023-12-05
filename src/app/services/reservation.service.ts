import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
   reservationObs$: Subject<Reservation> = new Subject() 
   apiUrl = 'assets/data';

  getReservationObs(): Observable<Reservation>{
    return this.reservationObs$.asObservable();
  }

  setReservationObs(reservation: Reservation){
    this.reservationObs$.next(reservation)
  }

  constructor(private http: HttpClient) { }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/reservations.json`,reservation);
  }
  getAllClientReservations(clientId: number): Observable<Reservation[]> {
    // normalement on envoi le clientId en URl pour avoir les reservations du client connecter 
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations.json`);
  }
  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reservations.json`);
  }
  modifyReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/reservations.json`, reservation);
  }

}
