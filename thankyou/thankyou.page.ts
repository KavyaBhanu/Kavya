/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.page.html',
  styleUrls: ['./thankyou.page.scss'],
})
export class ThankyouPage {
  constructor(private router: Router) {}

  ngOnInit() {
    // Redirect to the menu page after 5 seconds
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000); // 5000 milliseconds = 5 seconds
  }
}

