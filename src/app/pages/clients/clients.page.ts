import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  constructor(
    private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.clientsService.getClients().toPromise().then((res) => console.log(res));
  }
}
