
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  getItems(): Item[] {
    throw new Error('Method not implemented.');
  }
  removeCartItem(id: any) {
    throw new Error('Method not implemented.');
  }
  totalAmount!: number;
  calculateTotalAmount(): number {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:5001';
  private cartItems: any[] = [];
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }

  getSelectedItems(): any[] {
    return this.cartItems;
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // If item already exists in cart, increment its quantity
      existingItem.quantity++;
      this.updateCartItem(existingItem);
    } else {
      // Otherwise, add new item to cart
      const newItem = { ...item, quantity: 1 }; // Add quantity field
      this.cartItems.push(newItem);
      this.cartItemsSubject.next([...this.cartItems]);
      this.http.post<any>(`${this.apiUrl}/items`, newItem).subscribe(
        (response) => {
          console.log('Item added to cart:', response);
          newItem.id = response.id; // Assign the received 'id' to newItem
        },
        (error) => {
          console.error('Error adding item to cart:', error);
          // Handle error
        }
      );
    }
  }

  removeFromCart(item: any) {
    if (!item || !item.id) {
      console.error('Invalid item or item ID is undefined');
      return;
    }
    
    const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const existingItem = this.cartItems[existingItemIndex];
      if (existingItem.quantity > 1) {
        // If quantity is more than 1, decrement it
        existingItem.quantity--;
        this.updateCartItem(existingItem);
      } else {
        // If quantity is 1, remove item from cart entirely
        this.cartItems.splice(existingItemIndex, 1);
        this.cartItemsSubject.next([...this.cartItems]);
        // Call API to remove item from the database
        this.http.delete(`${this.apiUrl}/items/${item.id}`).subscribe(
          () => {
            console.log('Item removed from cart:', item);
          },
          (error) => {
            console.error('Error removing item from cart:', error);
            // Handle error
          }
        );
      }
    }
  }

  updateCartItem(updatedItem: any) {
    const itemId = updatedItem.id;
    if (itemId) {
      const data = { quantity: updatedItem.quantity };
      this.http.put(`${this.apiUrl}/items/${itemId}`, data, { responseType: 'text' }).pipe(
        catchError(error => {
          console.error('Error updating item quantity:', error);
          return throwError('Failed to update item quantity');
        })
      ).subscribe(
        () => {
          console.log('Item quantity updated:', updatedItem);
          this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers about the update
        }
      );
    } else {
      console.error('Item ID is undefined');
      // Handle error
    }
  }

  getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([...this.cartItems]); // Clear the cart and notify subscribers
  }
}