import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { App } from './app';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  allData = [];
  apiUrl = "https://randomuser.me/api/?results=5&inc=name,email,dob,phone,location";

  getData(): Observable<App[]> {
    // return of(this.allData);
    return this.http.get<App[]>(this.apiUrl);
  }

}
