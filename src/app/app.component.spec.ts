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
      providers: [{ provide: ClientService, useValue: clientService }],
    });

    fixture = TestBed.createComponent(AppComponent);
    TestBed.inject(ClientService)
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call setReservationObs method of ClientService on ngOnInit', () => {
    component.ngOnInit();
    expect(clientService.setReservationObs).toHaveBeenCalledWith({
      id: 201,
      name: 'Hamza',
      email: 'hamza@example.com',
    });
  });
});
