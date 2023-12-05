import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReservationsListComponent } from './reservations-list.component';
import { of, Subject } from 'rxjs';
import { ReservationService } from 'src/app/services/reservation.service';

describe('ReservationsListComponent', () => {
  let component: ReservationsListComponent;
  let fixture: ComponentFixture<ReservationsListComponent>;
  let reservationService: ReservationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsListComponent ],
      providers: [ReservationService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsListComponent);
    component = fixture.componentInstance;
    reservationService = TestBed.inject(ReservationService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get reservations on ngOnInit', () => {
    const mockReservations = { reservationId:1, clientId: 1, travelDate: new Date('2023-12-28'), busId: 1  };
    const getReservationsSpy = jest.spyOn(reservationService, 'getReservationObs').mockReturnValue(of(mockReservations));

    fixture.detectChanges();

    expect(getReservationsSpy).toHaveBeenCalled();
    expect(component.reservations).toEqual(mockReservations);
  });
  it('should fetch client reservations on ngOnInit', () => {
    const mockClientReservations = { reservationId: 1, clientId: 1, travelDate: new Date('2023-12-28'), busId: 1 };
    const getAllClientReservationsSpy = jest.spyOn(reservationService, 'getReservationObs').mockReturnValue(of(mockClientReservations));

    component.ngOnInit();

    expect(reservationService.getAllClientReservations).toHaveBeenCalledWith(component.CLIENT_ID);
    expect(component.reservations).toEqual(mockClientReservations);
  });

  it('should modify reservation', () => {
    const mockReservation: any = { reservationId: 1};
    component.reservations = [mockReservation];

    component.modifyReservation(mockReservation);

    expect(component.reservations[0]['edit']).toBe(true);
  });

  it('should apply modifications to reservation', () => {
    const mockReservation: any = { reservationId: 1 };
    component.reservations = [mockReservation];
    component.busModification.setValue('123');
    component.dateModification.setValue('2023-12-28');

    component.apply(mockReservation);

    expect(component.reservations[0]['edit']).toBe(false);
    expect(component.reservations[0].busId).toBe(123);
    expect(component.reservations[0].travelDate).toEqual(new Date('2023-12-28'));
  });

  it('should delete reservation', () => {
    const mockReservation: any = { reservationId: 1, /* other properties */ };
    component.reservations = [mockReservation];

    component.deleteReservation(mockReservation.reservationId);

    expect(component.reservations.length).toBe(0);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    jest.spyOn(component.unsubscribe$, 'next');
    jest.spyOn(component.unsubscribe$, 'complete');

    component.ngOnDestroy();

    expect(component.unsubscribe$.next).toHaveBeenCalledWith(true);
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });
});
