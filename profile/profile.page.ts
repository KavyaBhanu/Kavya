import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private navCtrl:NavController
  ) {}

  ngOnInit() {
    // Retrieve user details from AuthService
    this.userProfile = this.authService.getLoggedInUser();
  }

  editProfile() {
    // Assuming userId is available in userProfile
    const userId = this.userProfile.id;
    // Update user profile data
    this.authService.updateProfile(userId, this.userProfile).subscribe(
      (response) => {
        // Handle success response
        console.log('Profile updated successfully:', response);
        this.navCtrl.back();
      },
      (error) => {
        // Handle error response
        console.error('Failed to update profile:', error);
      }
    );
  }

  
}
