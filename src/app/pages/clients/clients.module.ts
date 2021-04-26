import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsPageRoutingModule } from './clients-routing.module';

import { ClientsPage } from './clients.page';
import { NewClientComponent } from 'src/app/components/clients/new-client/new-client.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientsPage, NewClientComponent]
})
export class ClientsPageModule {}
