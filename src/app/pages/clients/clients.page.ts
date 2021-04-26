import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NewClientComponent } from 'src/app/components/clients/new-client/new-client.component';
import { Client } from 'src/app/models/Client';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  clientsList: Client[] = [];

  constructor(
    private clientsService: ClientsService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getClientsList();
    this.subscribeToGetUpdateClientListEmitter();
  }

  async refreshClientsList(event) {
    await this.getClientsList();
    event.target.complete();
  }

  subscribeToGetUpdateClientListEmitter() {
    this.clientsService.getUpdateClientListEmitter().subscribe(
      () => this.getClientsList()
    )
  }

  async getClientsList() {
    this.clientsService.getClients()
      .toPromise()
      .then((res) => this.clientsList = res);
  }

  deleteClient(id: string) {
    this.clientsService.deleteClientById(id)
      .toPromise()
      .then(
        (res) => {
          this.getClientsList();
          this.presentToast('Cliente deletado com suceso.');
        },
        (err) => console.log(err));
  }

  async editClient(client: Client) {
    const modal = await this.modalCtrl.create({
      component: NewClientComponent,
      componentProps: { registeredClient: client }
    });
    modal.present();
  }

  async presentNewClientModal() {
    const modal = await this.modalCtrl.create({
      component: NewClientComponent
    });
    return await modal.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
