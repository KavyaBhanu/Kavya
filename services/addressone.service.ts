import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressoneService {
  private selectedAddress: any; // Assuming you store the selected address here

  constructor() { }

  setSelectedAddress(address: any) {
    this.selectedAddress = address;
  }

  getSelectedAddress(): any {
    return this.selectedAddress;
  }
}
