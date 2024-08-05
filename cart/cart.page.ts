import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ItemService } from '../service/items.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private itemService: ItemService,
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(itemToRemove: any): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemToRemove.id);
  }

  async selectQuantity(item: any) {
    if (!item) {
      console.error('Invalid item');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Select Quantity',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          max: 20,
          value: item.quantity
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            const newQuantity = parseInt(data.quantity, 10);
            const updatedItem = { ...item, quantity: newQuantity };
            this.cartService.updateCartItem(updatedItem);
            this.calculateTotalPrice();
          }
        }
      ]
    });

    await alert.present();
  }

  placeOrder() {
    console.log('Navigating to place order page...');
    console.log('Cart items:', this.cartItems);
    console.log('Total price:', this.getTotalPrice());

    this.navCtrl.navigateForward('/placeorder', {
      state: {
        cartItems: this.cartItems,
        totalPrice: this.getTotalPrice()
      }
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.quantity * item.priceINR), 0);
  }

  calculateTotalPrice() {
    // Recalculate total price
    const totalPrice = this.getTotalPrice();
    // Optionally update any UI elements related to total price
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.updateCartItem(item);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItem(item);
    }
  }
}
