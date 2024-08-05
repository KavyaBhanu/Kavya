import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:5001/items'; // Adjust the URL to match your server

  constructor(private http: HttpClient) {}

  addItem(name: string, price: number, quantity: number): Observable<any> {
    const data = { name, price, quantity }; // Create data object with name, price, and quantity
    return this.http.post<any>(this.apiUrl, data); // Perform HTTP POST request to add item
  }

  updateItem(id: number, name: string, price: number, quantity: number): Observable<any> {
    const data = { name, price, quantity }; // Create data object with name, price, and quantity
    return this.http.put(`${this.apiUrl}/${id}`, data); // Perform HTTP PUT request to update item
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Perform HTTP GET request to fetch items
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); // Perform HTTP DELETE request to delete item
  }
}
