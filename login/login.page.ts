// login.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Make sure to import AlertController

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController // Inject AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@gmail.com'),
        ],
      ],
      password: [
        '',
        [
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{6,}'
          ),
          Validators.required,
        ],
      ],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          // Handle successful login
          console.log('Login successful:', response);
          this.router.navigate(['/home']); 
          
        },
        async (error) => {
          // Handle login error
          console.error('Login error:', error);
          await this.presentAlert('Invalid email or password');
        }
      );
    } else {
      // Form is invalid, display error messages or take appropriate action
      console.error('Invalid form submission');
      await this.presentAlert("Invalid email or password");
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  redirectToForgotPassword() {
    // Navigate to the forgot password page
    this.router.navigate(['/forgot-password']);
  }
}
