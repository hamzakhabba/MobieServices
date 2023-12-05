import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsListComponent } from './reservations-list.component';
import { of } from 'rxjs';
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
    const mockReservations = { clientId: 1, travelDate: new Date('2023-12-28'), busId: 1  };
    const getReservationsSpy = jest.spyOn(reservationService, 'getReservationObs').mockReturnValue(of(mockReservations));

    fixture.detectChanges(); // ngOnInit will be called

    expect(getReservationsSpy).toHaveBeenCalled();
    expect(component.reservations).toEqual(mockReservations);
  });
});
