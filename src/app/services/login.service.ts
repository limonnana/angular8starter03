import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '.././models/user';
import { environment } from '../../environments/environment';  
import { Login } from '.././models/login';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export interface Credentials {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  error: string | undefined;
  credentials: Credentials = { username: '', token: '' };

  constructor(private httpClient: HttpClient) { }

  public authenticate(context: Login){
    return this.httpClient
    .post<User>(`${environment.domain}/authenticate`, context)
    .pipe(
      retry(1),
        catchError(this.handleError)
      )
  }
  

 handleError(error: { error: { message: string }; status: any; message: any }) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}
}

