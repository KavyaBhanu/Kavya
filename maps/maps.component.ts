// maps.component.ts

import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any; // Declare google variable to avoid TypeScript errors

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      const marker = new google.maps.Marker({
        position: { lat: position.coords.latitude, lng: position.coords.longitude },
        map: map
      });
    } catch (error) {
      console.error('Error loading map:', error);
    }
  }
}
