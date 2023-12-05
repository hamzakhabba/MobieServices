import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservation } from '../../models/reservation.model';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = this.fb.group({});

  constructor(
      private fb: FormBuilder, 
      private reservationService: ReservationService 
    ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.reservationForm = this.fb.group({
      travelDate: ['', [Validators.required]],
      busId: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if(this.reservationForm.valid){
      const reservation: Reservation = this.reservationForm.value;
      console.log(reservation)
      this.reservationService.addReservation(reservation);
      this.reservationService.setReservationObs(reservation);
      this.reservationForm.reset();
    }
  }

}
