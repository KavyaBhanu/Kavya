import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PincodeService } from '../pincode.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage {
  firstName: string = '';
  lastName: string = '';
  houseNo: string = '';
  apartmentRoadArea: string = '';
  pinCode: string = '';
  district: string = '';
  state: string = '';
  phoneNumber: string = '';
  alternatePhoneNumber: string = '';
  addressType: string = '';
  invalidFirstName: boolean = false;
  invalidLastName: boolean = false;
  invalidPinCode: boolean = false;
  invalidPhoneNumber: boolean = false;
  invalidAlternatePhoneNumber: boolean = false;
  confirmed: boolean = false;
  editMode: boolean = true;
  savedAddress: {
    firstName: string;
    lastName: string;
    houseNo: string;
    apartmentRoadArea: string;
    pinCode: string;
    district: string;
    state: string;
    phoneNumber: string;
    alternatePhoneNumber: string;
    addressType: string;
  } = {
    firstName: '',
    lastName: '',
    houseNo: '',
    apartmentRoadArea: '',
    pinCode: '',
    district: '',
    state: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    addressType: ''
  };

  constructor(
    private router: Router,
    private pincodeService: PincodeService
  ) {}

  confirmLocation(): void {
    if (!this.validateForm()) {
      return;
    }

    this.pincodeService.getDistrictAndState(this.pinCode).subscribe(
      (response: any[]) => {
        if (response && response.length > 0 && response[0].Status === 'Success') {
          const data = response[0].PostOffice[0];
          this.district = data.District;
          this.state = data.State;
          this.savedAddress = {
            firstName: this.firstName,
            lastName: this.lastName,
            houseNo: this.houseNo,
            apartmentRoadArea: this.apartmentRoadArea,
            pinCode: this.pinCode,
            district: this.district,
            state: this.state,
            phoneNumber: this.phoneNumber,
            alternatePhoneNumber: this.alternatePhoneNumber,
            addressType: this.addressType
          };
        } else {
          this.invalidPinCode = true;
        }
      },
      (error: any) => {
        console.error('Error fetching district and state:', error);
      }
    );

    this.confirmed = true;
    this.editMode = false; // Lock the address fields
  }

  validateForm(): boolean {
    return (
      this.validateFirstName() &&
      this.validateLastName() &&
      this.validatePinCode() &&
      this.validatePhoneNumber() &&
      this.validateAlternatePhoneNumber()
    );
  }

  validateFirstName(): boolean {
    this.invalidFirstName = !/^[a-zA-Z]+$/.test(this.firstName);
    return !this.invalidFirstName;
  }

  validateLastName(): boolean {
    this.invalidLastName = !/^[a-zA-Z]+$/.test(this.lastName);
    return !this.invalidLastName;
  }

  validatePinCode(): boolean {
    this.invalidPinCode = !/^[1-9][0-9]{5}$/.test(this.pinCode);
    return !this.invalidPinCode;
  }

  validatePhoneNumber(): boolean {
    this.invalidPhoneNumber = !/^[6-9][0-9]{9}$/.test(this.phoneNumber);
    return !this.invalidPhoneNumber;
  }

  validateAlternatePhoneNumber(): boolean {
    this.invalidAlternatePhoneNumber = !/^[6-9][0-9]{9}$/.test(this.alternatePhoneNumber);
    return !this.invalidAlternatePhoneNumber;
  }

  editAddress(): void {
    this.editMode = true; // Enable editing of the address fields
  }

  fetchLocation(): void {
    // Implement your logic to fetch location based on the entered pin code
  }

  deleteAddress(): void {
    // Reset all fields
    this.firstName = '';
    this.lastName = '';
    this.houseNo = '';
    this.apartmentRoadArea = '';
    this.pinCode = '';
    this.district = '';
    this.state = '';
    this.phoneNumber = '';
    this.alternatePhoneNumber = '';
    this.addressType = '';
    this.invalidFirstName = false;
    this.invalidLastName = false;
    this.invalidPinCode = false;
    this.invalidPhoneNumber = false;
    this.invalidAlternatePhoneNumber = false;
    this.confirmed = false;
    this.editMode = true;
    this.savedAddress = {
      firstName: '',
      lastName: '',
      houseNo: '',
      apartmentRoadArea: '',
      pinCode: '',
      district: '',
      state: '',
      phoneNumber: '',
      alternatePhoneNumber: '',
      addressType: ''
    };

    // Navigate to PlaceOrderPage
    this.router.navigate(['/placeorder']);
  }
}
