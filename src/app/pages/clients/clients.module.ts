import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsPageRoutingModule } from './clients-routing.module';

import { ClientsPage } from './clients.page';
import { ClientFormsComponent } from 'src/app/components/clients/client-forms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientsPage, ClientFormsComponent]
})
export class ClientsPageModule {}
