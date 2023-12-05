import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservationService } from './reservation.service';
import { Reservation } from '../models/reservation.model';

describe('ReservationService', () => {
  let service: ReservationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationService],
    });
    service = TestBed.inject(ReservationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit reservation on setReservationObs', () => {
    const mockReservation: Reservation = {
      reservationId: 1,
      travelDate: new Date('27-12-2023'),
      busId: 0,
      clientId: 0
    };

    service.setReservationObs(mockReservation);

    service.getReservationObs().subscribe((reservation) => {
      expect(reservation).toEqual(mockReservation);
    });
  });
  it('should add a reservation', () => {
    const mockReservation: Reservation = {
      reservationId: 1,
      travelDate: new Date('27-12-2023'),
      busId: 0,
      clientId: 0
    };

    service.addReservation(mockReservation).subscribe((reservation) => {
      expect(reservation).toEqual(mockReservation);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/reservations.json`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockReservation);
  });

  it('should get all client reservations', () => {
    const clientId = 123;
    const mockReservations: Reservation[] = [{
      reservationId: 1,
      travelDate: new Date('27-12-2023'),
      busId: 0,
      clientId: 0
    }];

    service.getAllClientReservations(clientId).subscribe((reservations) => {
      expect(reservations).toEqual(mockReservations);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/reservations.json`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockReservations);
  });
});
