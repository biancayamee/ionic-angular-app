import { Component, Input, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Client } from 'src/app/models/Client';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-client-forms',
  templateUrl: './client-forms.component.html',
  styleUrls: ['./client-forms.component.scss'],
})
export class ClientFormsComponent implements OnInit {
  public creatingNewClient: boolean;
  public registerForm: FormGroup;
  private client: Client;
  @Input() registeredClient: Client;

  constructor(
    public formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private modalCtrl: ModalController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.setFormType();
    this.initForm();
  }

  setFormType() {
    this.creatingNewClient = this.registeredClient == null;
    this.client = this.creatingNewClient ? new Client : this.registeredClient;
  }

  onSubmit() {
    if (this.creatingNewClient) {
      this.saveNewClient();
    } else {
      this.updateRegisteredClient();
    }
  }

  saveNewClient() {
    this.clientsService.saveClient(this.registerForm.value.name, this.registerForm.value.cpf, this.registerForm.value.email, this.registerForm.value.gender)
      .toPromise()
      .then((res) => {
        this.clientsService.emitUpdateClientList();
        this.presentToast('Cliente cadastrado com sucesso.');
      },
        (err) => this.presentToast('Ocorreu um erro ao cadastrar o cliente, tente novamente mais tarde.'));
  }

  updateRegisteredClient() {
    this.clientsService.updateClientById(this.registeredClient.id, this.registerForm.value.name, this.registerForm.value.cpf, this.registerForm.value.email, this.registerForm.value.gender)
      .toPromise()
      .then((res) => {
        this.clientsService.emitUpdateClientList();
        this.presentToast('Cliente atualizado com sucesso.');
        this.closeModal();
      },
        (err) => this.presentToast('Ocorreu um erro ao atualizar o cliente, tente novamente mais tarde.'));

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: message,
      duration: 2000
    });
    toast.present();
  }

  initForm() {
    this.client.id = this.registeredClient?.id;
    this.registerForm = new FormGroup({
      name: new FormControl(this.client.name, [Validators.required]),
      email: new FormControl(this.client.email, Validators.compose([
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,3})+$/
        )
      ])),
      cpf: new FormControl(this.client.cpf, Validators.compose([Validators.required])),
      gender: new FormControl(this.client.gender, Validators.compose([Validators.required])),
    });
  }

  get name() { return this.registerForm.get('name') };
  get email() { return this.registerForm.get('email') };
  get cpf() { return this.registerForm.get('cpf') };
  get gender() { return this.registerForm.get('gender') };

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
