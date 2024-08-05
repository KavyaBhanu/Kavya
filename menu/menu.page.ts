import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  foodItems: any[] = [

 
  { name: 'Apples', price: 3, priceINR: 225, priceUSD: 3, imageUrl: 'assets/apple.jpg', category: 'Fruits' },
  { name: 'Bananas', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/banana.jpg', category: 'Fruits' },
  { name: 'Grapes', price: 2.5, priceINR: 187.5, priceUSD: 2.5, imageUrl: 'assets/grapes.jpg', category: 'Fruits' },
  { name: 'Oranges', price: 3, priceINR: 225, priceUSD: 3, imageUrl: 'assets/orange.jpg', category: 'Fruits' },
  { name: 'Mango', price: 3, priceINR: 225, priceUSD: 3, imageUrl: 'assets/mango.jpg', category: 'Fruits' },

  { name: 'Tomato', price: 1.5, priceINR: 112.5, priceUSD: 1.5, imageUrl: 'assets/tomato.jpg', category: 'Vegetables' },
  { name: 'Broccoli', price: 1, priceINR: 75, priceUSD: 1, imageUrl: 'assets/broccoli.jpg', category: 'Vegetables' },
  { name: 'Beetroot', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/beetroot.jpg', category: 'Vegetables' },
  { name: 'Cabbage', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/cabbage.jpg', category: 'Vegetables' },
  { name: 'Carrot', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/carrot.jpg', category: 'Vegetables' },

  { name: 'Almonds', price: 5, priceINR: 375, priceUSD: 5, imageUrl: 'assets/almond.jpg', category: 'Nuts' },
  { name: 'Walnuts', price: 6, priceINR: 450, priceUSD: 6, imageUrl: 'assets/walnut.jpg', category: 'Nuts' },
  { name: 'Cashews', price: 5, priceINR: 375, priceUSD: 5, imageUrl: 'assets/cashew.jpg', category: 'Nuts' },
  { name: 'Pistachios', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/pistachois.jpg', category: 'Nuts' }, // Corrected filename and name case
  // Jasmine removed as it was incorrectly categorized as 'Nuts'

  { name: 'Milk', price: 3, priceINR: 225, priceUSD: 3, imageUrl: 'assets/milk.jpg', category: 'Dairy' },
  { name: 'Cheese', price: 5, priceINR: 375, priceUSD: 5, imageUrl: 'assets/cheese.jpg', category: 'Dairy' },
  { name: 'Butter', price: 4, priceINR: 300, priceUSD: 4, imageUrl: 'assets/butter.jpg', category: 'Dairy' },

  { name: 'Turmeric Powder', price: 1, priceINR: 75, priceUSD: 1, imageUrl: 'assets/turmeric.jpg', category: 'Masala and Spices' },
  { name: 'Cumin Seeds', price: 1.5, priceINR: 112.5, priceUSD: 1.5, imageUrl: 'assets/cumin.jpg', category: 'Masala and Spices' },
  { name: 'Coriander Powder', price: 1, priceINR: 75, priceUSD: 1, imageUrl: 'assets/coriander.jpg', category: 'Masala and Spices' },
  { name: 'Garam Masala', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/garam.jpg', category: 'Masala and Spices' },
  { name: 'Red Chillis', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/chilli.jpg', category: 'Masala and Spices' },
  // Coriander repeated entry removed

  { name: 'Dark Chocolate', price: 4, priceINR: 300, priceUSD: 4, imageUrl: 'assets/dark-chocolate.jpg', category: 'Chocolate' },
  { name: 'Milk Chocolate', price: 3.5, priceINR: 262.5, priceUSD: 3.5, imageUrl: 'assets/milk-chocolate.jpg', category: 'Chocolate' },
  { name: 'White Chocolate', price: 3, priceINR: 225, priceUSD: 3, imageUrl: 'assets/white-chocolate.jpg', category: 'Chocolate' },

  { name: 'Basmati Rice', price: 3, priceINR: 225, priceUSD: 3, imageUrl: 'assets/basmathi.jpg', category: 'Rice' },
  { name: 'Brown Rice', price: 2.5, priceINR: 187.5, priceUSD: 2.5, imageUrl: 'assets/brown.jpg', category: 'Rice' },
  { name: 'Black Rice', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/black.jpg', category: 'Rice' },
  { name: 'Wild Rice', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/wild.jpg', category: 'Rice' },
  { name: 'Jasmine Rice', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/jasmine.jpg', category: 'Rice' },
   

  { name: 'Wheat Flour', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/wheat_flour.jpg', category: 'Flour' },
  { name: 'Rice Flour', price: 2, priceINR: 150, priceUSD: 2, imageUrl: 'assets/rice_flour.jpg', category: 'Flour' },
  { name: 'Almond Flour', price: 4, priceINR: 300, priceUSD: 4, imageUrl: 'assets/almond_flour.jpg', category: 'Flour' },
  { name: 'White corn Flour', price: 4, priceINR: 300, priceUSD: 4, imageUrl: 'assets/white_flour.jpg', category: 'Flour' }

];

  cartItemCount: number = 0;
  filteredFoodItems: any[] = [];
  category: string | undefined;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private cartService: CartService
  ) {}

  ngOnInit() {

    const routerState = this.router.getCurrentNavigation()?.extras.state;
    if (routerState) {
      this.category = routerState['category'];
    }
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
    this.filteredFoodItems = this.foodItems; // Initially show all items
  }

  updateCartItemCount(items: any[]) {
    this.cartItemCount = items.length;
  }

  filterByCategory(category: string) {
    if (category === 'All') {
      this.filteredFoodItems = this.foodItems;
    } else {
      this.filteredFoodItems = this.foodItems.filter(item => item.category === category);
    }
  }

  filterItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (!searchTerm) {
      this.filteredFoodItems = this.foodItems;
    } else {
      this.filteredFoodItems = this.foodItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
    }
  }

  async addToCart(foodItem: any) {
    this.cartService.addToCart(foodItem);
    const toast = await this.toastController.create({
      message: `${foodItem.name} added to cart.`,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  goToCartPage() {
    this.router.navigate(['/cart']);
  }
}
