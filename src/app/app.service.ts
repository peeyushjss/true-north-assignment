import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { App } from './app';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private http: HttpClient) { }

  apiUrl = "https://randomuser.me/api/?results=200&inc=name,email,dob,phone,location";

  getData(): Observable<App[]> {
    return this.http.get<App[]>(this.apiUrl);
  }

}
