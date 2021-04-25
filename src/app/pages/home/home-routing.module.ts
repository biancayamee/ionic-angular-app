import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'clients',
    loadChildren: () => import('../clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('../products/products.module').then( m => m.ProductsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
