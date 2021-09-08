import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiURL: any
  private userDetailsToEdit = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getUsers() {
    return this.httpClient.get(this.apiURL)
  }

  sendUserData(value: any) {
    this.userDetailsToEdit.next(value)
  }

  receiveUserData(): Observable<any> {
    return this.userDetailsToEdit.asObservable();
  }

  saveUserDetails(formData) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    };
    return this.httpClient.post(this.apiURL, formData, httpOptions)
  }

  updateUserDetails(formData, uID) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    };
    return this.httpClient.put(this.apiURL + `/` + uID, formData, httpOptions)
  }

  deleteUser(uID) {
    return this.httpClient.delete(this.apiURL + `/` + uID)
  }
}
