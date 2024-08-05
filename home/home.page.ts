import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
categories: any;
store_types: any[] = [];
  constructor(private router: Router) {}
  

  ngOnInit() {

    this.store_types = [
      { id: 1, name: 'Vegetables', icon: 'veg1.jpg', route: '/menu' },
      { id: 2, name: 'Fruits', icon: 'fru.jpg', route: '/menu' },
      { id: 3, name: 'Nuts', icon: 'nut.jpg', route: '/menu' },
      { id: 4, name: 'Chocolate', icon: 'choco.jpg', route: '/menu' },
      { id: 5, name: 'Masala & spices', icon: 'masa.jpg', route: '/menu' },
      { id: 6, name: 'Rice', icon: 'ric.jpg', route: '/menu' },
      { id: 7, name: 'Flour', icon: 'flour.jpg', route: '/menu' },
      { id: 7, name: 'Dairy', icon: 'dairy.jpg', route: '/menu' },
    ];
    
  }

  navigate(storeType: any) {
    this.router.navigate([storeType.route], { queryParams: { type: storeType.id } });
  }
}


 
