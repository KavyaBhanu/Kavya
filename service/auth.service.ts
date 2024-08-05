// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  private apiUrl = 'http://localhost:5000/users'; // Adjust the URL to match your server
  loggedInUser: any;

  constructor(private http: HttpClient) {}
  setLoggedInUser(user: any) {
    this.loggedInUser = user;
  // Assuming 'username' is a property of the 'user' object, set it here
  this.loggedInUser.username = user.username;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  register(username:string,  email: string, password: string, confirm_password: string): Observable<any> {
    const data = {username, email, password, confirm_password };
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
    tap((response: any) => {
      // Set user details after successful login
      this.setLoggedInUser(response.user);
    })
    );
  }
  getProfile(userId: number): Observable<any> {
    const url = `http://localhost:5000/users/profile/${userId}`; // Append the ID to the URL
    return this.http.get(url);
  }
  
 updateProfile(userId: number, userData: any): Observable<any> {
  const url = `${this.apiUrl}/update/${userId}`;
  return this.http.put(url, userData).pipe(
    tap((response: any) => {
      if (response && response.status === 'ok') {
        console.log('Profile updated successfully');
      } else {
        console.log('Failed to update profile');
      }
    })
  );
}
 

}

