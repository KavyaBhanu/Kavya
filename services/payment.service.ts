import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  // Method to process payment (simulate payment for now)
  processPayment(): Observable<any> {
    // You can replace this with actual payment gateway integration logic
    // For now, we'll simulate a successful payment
    return new Observable(observer => {
      setTimeout(() => {
        observer.next('Payment successful');
        observer.complete();
      }, 2000); // Simulate a delay of 2 seconds
    });
  }
}
