import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductFormsComponent } from 'src/app/components/product-forms/product-forms.component';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  productsList: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getProductsList();
    this.subscribeToUpdateProductListEmitter();
  }

  async refreshProductsList(event) {
    await this.getProductsList();
    event.target.complete();
  }

  subscribeToUpdateProductListEmitter() {
    this.productsService.getUpdateProductListEmitter().subscribe(
      () => this.getProductsList()
    )
  }

  async getProductsList() {
    this.productsService.getProducts()
      .toPromise()
      .then((res) => this.productsList = res);
  }

  deleteProduct(id: string) {
    this.productsService.deleteProductById(id)
      .toPromise()
      .then(
        (res) => {
          this.getProductsList();
          this.presentToast('Produto deletado com suceso.');
        },
        (err) => console.log(err));
  }

  async editProduct(product: Product) {
    console.log(product);
    const modal = await this.modalCtrl.create({
      component: ProductFormsComponent,
      componentProps: { registeredProduct: product }
    });
    modal.present();
  }

  async presentNewProductModal() {
    const modal = await this.modalCtrl.create({
      component: ProductFormsComponent
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
