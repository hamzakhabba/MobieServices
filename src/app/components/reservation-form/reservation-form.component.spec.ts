import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { ReservationFormComponent } from './reservation-form.component';
import { ReservationService } from '../../services/reservation.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReservationFormComponent', () => {
  let component: ReservationFormComponent;
  let fixture: ComponentFixture<ReservationFormComponent>;
  let reservationService: ReservationService;
  let fb: FormBuilder;

  beforeEach(async () => {
   
    await TestBed.configureTestingModule({
      declarations: [ ReservationFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, ReservationService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationFormComponent);
    component = fixture.componentInstance;
    reservationService = TestBed.inject(ReservationService)
    fb = TestBed.inject(FormBuilder)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.initForm();
    expect(component.reservationForm.get('travelDate')).toBeTruthy();
    expect(component.reservationForm.get('busId')).toBeTruthy();
  });

  it('should submit the form if valid', async () => {
    component.reservationForm = fb.group({
      travelDate: ['', [Validators.required]],
      busId: ['', [Validators.required]],
    })
    const reservationMock = { reservationId:1, clientId: 1, travelDate: new Date('2023-12-28'), busId: 1  };
    component.reservationForm.patchValue(reservationMock);
    const addReservationSpy = jest.spyOn(reservationService, 'addReservation').mockReturnValue(of(reservationMock));
    component.onSubmit();
    fixture.detectChanges();
    await fixture.whenStable()
    
    expect(addReservationSpy).toHaveBeenCalledWith(reservationMock);
    expect(component.reservationForm.value).toEqual({  travelDate: "",
    busId: ""});
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
