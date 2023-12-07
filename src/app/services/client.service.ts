import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientObs$: Subject<Client> = new Subject();
  constructor() {}

  setReservationObs(client: Client) {
    this.clientObs$.next(client);
  }
}
