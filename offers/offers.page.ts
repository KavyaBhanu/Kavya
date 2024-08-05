import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage {
  revealedCodes: string[] = [];
  expiredCodes: string[] = [];

  constructor(private router: Router) {}

  revealCode(offer: string) {
    if (!this.revealedCodes.includes(offer)) {
      this.revealedCodes.push(offer);
      // Check if the code has expired
      const isExpired = this.checkExpiration(offer);
      if (isExpired) {
        this.expiredCodes.push(offer);
      }
    }
  }

  checkExpiration(offer: string): boolean {
    // Logic to check if the offer has expired
    // For demonstration, I'm assuming that the offer expires after 3 days
    const expirationDate = new Date(); // Current date
    expirationDate.setDate(expirationDate.getDate() + 3); // Adding 3 days
    const currentDate = new Date();
    return currentDate > expirationDate;
  }

  useCode(offer: string) {
    // Logic to handle using the code
    console.log('Using code for offer: ' + offer);
    // Navigate to place order page or any other action
    this.router.navigate(['/placeorder']);
  }

  isExpired(offer: string): boolean {
    return this.expiredCodes.includes(offer);
  }
}
