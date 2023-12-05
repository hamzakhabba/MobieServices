import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { ReservationFormComponent } from './reservation-form.component';
import { ReservationService } from '../../services/reservation.service';
import { of } from 'rxjs';

describe('ReservationFormComponent', () => {
  let component: ReservationFormComponent;
  let fixture: ComponentFixture<ReservationFormComponent>;
  let reservationService: ReservationService;

  beforeEach(async () => {
   
    await TestBed.configureTestingModule({
      declarations: [ ReservationFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder, ReservationService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationFormComponent);
    component = fixture.componentInstance;
    reservationService = TestBed.inject(ReservationService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.initForm();
    expect(component.reservationForm.get('date')).toBeTruthy();
    expect(component.reservationForm.get('bus')).toBeTruthy();
  });

  it('should submit the form if valid', async () => {
    const reservationMock = { reservationId:1, clientId: 1, travelDate: new Date('2023-12-28'), busId: 1  };
    component.reservationForm.patchValue(reservationMock);
    const addReservationSpy = jest.spyOn(reservationService, 'addReservation').mockReturnValue(of(reservationMock));
    component.onSubmit();
    fixture.detectChanges();
    await fixture.whenStable()
    
    expect(addReservationSpy).toHaveBeenCalledWith(reservationMock);
    expect(component.reservationForm.value).toEqual({});
  });

  it('should not submit the form if invalid', () => {
    const addReservationSpy = jest.spyOn(reservationService, 'addReservation');
    component.reservationForm.patchValue({
      date: '',
      bus: ''
    });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.onSubmit();
    })
    expect(addReservationSpy).not.toHaveBeenCalled();
  });
});
