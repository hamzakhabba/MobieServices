import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReservationsListComponent } from './reservations-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from 'src/app/models/reservation.model';

describe('ReservationsListComponent', () => {
  let component: ReservationsListComponent;
  let fixture: ComponentFixture<ReservationsListComponent>;
  let reservationService: ReservationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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

  it('should call getReservationObs and setReservationsList on initialization', fakeAsync(() => {
   
    const getReservationObsSpy = jest.spyOn(reservationService, 'getReservationObs')
    component.ngOnInit();
    tick();
    expect(getReservationObsSpy).toHaveBeenCalled();
  }));
  it('should fetch client reservations on ngOnInit', fakeAsync(() => {

    const mockClientReservations = [{ reservationId: 1, clientId: component.CLIENT_ID, travelDate: new Date('2023-12-28'), busId: 1 }];
    const getAllClientReservationsSpy = jest.spyOn(reservationService, 'getAllClientReservations').mockReturnValue(of(mockClientReservations));
    component.ngOnInit();
    tick();
    expect(getAllClientReservationsSpy).toHaveBeenCalled();
    expect(component.reservations).toEqual(mockClientReservations);
  }));

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
    const mockReservation: any = { reservationId: 1};
    component.reservations = [mockReservation];

    component.deleteReservation(mockReservation.reservationId);

    expect(component.reservations.length).toBe(0);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
