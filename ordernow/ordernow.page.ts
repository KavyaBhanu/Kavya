import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { CartService } from '../cart/cart.service';
import { PaymentService } from '../services/payment.service';
import { SuccessService } from '../success.service';
import { HttpClient } from '@angular/common/http';

// Example item interface - replace with your actual item structure
interface Item {
  name: string;
  quantity: number;
  priceINR: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-ordernow',
  templateUrl: './ordernow.page.html',
  styleUrls: ['./ordernow.page.scss'],
})
export class OrderNowPage implements OnInit {
  selectedItems: Item[] = [];
  totalAmount: string = '';
  fullName: string = '';
  address: string = '';
  phoneNumber: string = '';
  paymentOption: string = '';
  fullNameValid: boolean = false;
  addressValid: boolean = false;
  phoneNumberValid: boolean = false;
  notificationMessage: string = '';
  isCashOnDelivery: boolean = true;
  isPaymentOptionSelected: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private alertController: AlertController,
    private cartService: CartService,
    private paymentService: PaymentService,
    private successService: SuccessService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedItems = navigation.extras.state['selectedItems'] || [];
      this.calculateTotalAmount();
    } else {
      // Navigate back or show an error if no items are passed
      this.navCtrl.navigateBack('/cart');
    }
  }

  calculateTotalAmount(): void {
    const total = this.selectedItems.reduce((total, item) => total + (item.quantity * item.priceINR), 0);
    this.totalAmount = '₹' + total.toLocaleString('en-IN');
  }

  validateName(): void {
    const nameRegex = /^[A-Za-z]+$/;
    this.fullNameValid = nameRegex.test(this.fullName.trim());
 ;

    this.updateNotificationMessage();
  }

  validateAddress(): void {
    this.addressValid = this.address.trim().length > 0; // Simplified check; adjust as necessary
    this.updateNotificationMessage();
  }

  validatePhoneNumber(): void {
    const phoneRegex = /^[6-9]\d{9}$/;
    this.phoneNumberValid = phoneRegex.test(this.phoneNumber.trim());
    this.updateNotificationMessage();
  }

  togglePaymentOption(): void {
    this.isCashOnDelivery = this.paymentOption === 'cashondelivery';
    this.isPaymentOptionSelected = true;
    this.updateNotificationMessage();
  }

  updateNotificationMessage(): void {
    if (!this.fullNameValid) {
      this.notificationMessage = 'Name should contain only alphabets.';
    } else if (!this.addressValid) {
      this.notificationMessage = 'Please enter a valid address.';
    } else if (!this.phoneNumberValid) {
      this.notificationMessage = 'Please enter a valid phone number.';
    } else if (!this.isPaymentOptionSelected) {
      this.notificationMessage = 'Please select a payment option.';
    } else {
      this.notificationMessage = '';
    }
  }

  async confirmCancelOrder() {
    const alert = await this.alertController.create({
      header: 'Cancel Order',
      message: 'Are you sure you want to cancel the order?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.navigateBack('/cart');
          }
        }
      ]
    });

    await alert.present();
  }

  async proceedToPay() {
    if (this.isFormValid()) {
      if (this.paymentOption === 'cashondelivery') {
        await this.placeOrder();
      } else {
        this.paymentService.processPayment().subscribe(
          async () => {
            await this.placeOrder();
            await this.presentToast('Payment successful. Your order is confirmed and on the way. Thank you!');
          },
          async (error) => {
            console.error('Payment failed:', error);
            await this.presentToast('Payment failed. Please try again.');
          }
        );
      }
    } else {
      await this.presentToast(this.notificationMessage);
    }
  }

  async placeOrder() {
    try {
      // Example order placement logic
      this.presentToast('Your order has been placed successfully.');
      this.navCtrl.navigateRoot('/thankyou');
    } catch (error) {
      console.error('Failed to place order:', error);
      await this.presentToast('Failed to place order. Please try again.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  isFormValid(): boolean {
    return this.fullNameValid &&  this.addressValid && this.phoneNumberValid && this.isPaymentOptionSelected;
  }
}
