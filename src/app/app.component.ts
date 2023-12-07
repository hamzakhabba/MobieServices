import { Component } from '@angular/core';
import { ClientService } from './services/client.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private clientService: ClientService) {}
  ngOnInit() {
    this.clientService.setReservationObs({
      id: 201,
      name: 'Hamza',
      email: 'hamza@example.com',
    });
  }
}
