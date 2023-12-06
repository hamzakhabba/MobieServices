import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ClientService } from './services/client.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let clientService: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [ClientService],
    });

    fixture = TestBed.createComponent(AppComponent);
    clientService = TestBed.inject(ClientService)
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call setReservationObs method of ClientService on ngOnInit', () => {
    const setReservationObsSpy = jest.spyOn(clientService, 'setReservationObs')
    component.ngOnInit();
    expect(setReservationObsSpy).toHaveBeenCalledWith({
      id: 201,
      name: 'Hamza',
      email: 'hamza@example.com',
    });
  });
});
