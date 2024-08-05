import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.page.html',
  styleUrls: ['./placeorder.page.scss'],
})
export class PlaceorderPage implements OnInit {
  selectedItems: any[] = [];
  totalPrice: number = 0;
  
  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const cartItems = navigation.extras.state['cartItems'] || [];
      const additionalItems = navigation.extras.state['additionalItems'] || [];
      this.selectedItems = [...cartItems, ...additionalItems];
      this.calculateTotalPrice(); // Calculate total price initially
    }
  }

  goBackToCart() {
    this.router.navigate(['/cart']); // Navigate back to cart page
  }

  async selectAddress() {
    try {
      const coordinates = await this.getCurrentCoordinates();
      if (coordinates) {
        this.showMap(coordinates);
      } else {
        console.error('Error: Unable to retrieve current coordinates.');
      }
    } catch (error) {
      console.error('Error getting current coordinates:', error);
    }
  }

  async getCurrentCoordinates() {
    try {
      const position = await Geolocation.getCurrentPosition();
      if (position && position.coords) {
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      } else {
        console.error('Error: Invalid position data.');
        return null;
      }
    } catch (error) {
      console.error('Error getting current coordinates:', error);
      throw error;
    }
  }

  showMap(coordinates: { latitude: number, longitude: number }) {
    const { latitude, longitude } = coordinates;
    const mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map
    });
  }

  // Function to add quantity
  addQuantity(index: number) {
    if (this.selectedItems[index].quantity < 20) {
      this.selectedItems[index].quantity++;
      this.calculateTotalPrice(); // Recalculate total price
    }
  }

  // Function to remove quantity
  removeQuantity(index: number) {
    if (this.selectedItems[index].quantity > 1) {
      this.selectedItems[index].quantity--;
      this.calculateTotalPrice(); // Recalculate total price
    }
  }

  // Function to remove item from order
  removeFromOrder(index: number) {
    this.selectedItems.splice(index, 1);
    this.calculateTotalPrice(); // Recalculate total price
  }

  // Function to calculate total price
  calculateTotalPrice() {
    this.totalPrice = this.selectedItems.reduce((total, item) => total + (item.quantity * item.priceINR), 0);
  }

  // Function to add additional items to the order
  addItem(item: any) {
    this.selectedItems.push({ ...item, quantity: 1 });
    this.calculateTotalPrice(); // Recalculate total price
  }

  // Method to navigate to the address page
  goToAddAddressPage() {
    this.router.navigate(['/ordernow'], {
      state: {
        selectedItems: this.selectedItems
      }
    });
  }
}
