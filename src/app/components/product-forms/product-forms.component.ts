import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-forms',
  templateUrl: './product-forms.component.html',
  styleUrls: ['./product-forms.component.scss'],
})
export class ProductFormsComponent implements OnInit {

  public creatingNewProduct: boolean;
  public registerForm: FormGroup;
  private product: Product;
  @Input() registeredProduct: Product;

  constructor(
    public formBuilder: FormBuilder,
    private productsService: ProductsService,
    private modalCtrl: ModalController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.setFormType();
    this.initForm();
  }

  setFormType() {
    this.creatingNewProduct = this.registeredProduct == null;
    this.product = this.creatingNewProduct ? new Product : this.registeredProduct;
  }

  onSubmit() {
    if (this.creatingNewProduct) {
      this.saveNewProduct();
    } else {
      this.updateRegisteredProduct();
    }
  }

  saveNewProduct() {
    console.log(this.registerForm.value);
    this.productsService.saveProduct(this.registerForm.value.name, this.registerForm.value.manufacturing, this.registerForm.value.size, this.registerForm.value.price)
      .toPromise()
      .then(() => {
        this.productsService.emitUpdateProductList();
        this.presentToast('Produto cadastrado com sucesso.');
      },
        () => this.presentToast('Ocorreu um erro ao cadastrar o produto, tente novamente mais tarde.'));
  }

  updateRegisteredProduct() {
    this.productsService.updateProductById(this.registeredProduct.id, this.registerForm.value.name, this.registerForm.value.manufacturing, this.registerForm.value.size, this.registerForm.value.price)
      .toPromise()
      .then(() => {
        this.productsService.emitUpdateProductList();
        this.presentToast('Produto atualizado com sucesso.');
        this.closeModal();
      },
        () => this.presentToast('Ocorreu um erro ao atualizar o produto, tente novamente mais tarde.'));

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
    console.log(this.registeredProduct);
    this.product.id = this.registeredProduct?.id;
    this.registerForm = new FormGroup({
      name: new FormControl(this.product.name, [Validators.required]),
      manufacturing: new FormControl(this.product.manufacturing, [Validators.required]),
      size: new FormControl(this.product.size, [Validators.required]),
      price: new FormControl(this.product.price, [Validators.required]),
    });
  }

  get name() { return this.registerForm.get('name') };
  get manufacturing() { return this.registerForm.get('manufacturing') };
  get size() { return this.registerForm.get('size') };
  get price() { return this.registerForm.get('price') };

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
