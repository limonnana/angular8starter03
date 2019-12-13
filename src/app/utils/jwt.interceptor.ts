import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from 'src/app/services/credentials.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    credentialJson: string = 'defaul-Value';

    constructor(private credentialsService: CredentialsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
       let currentUserCredentials = this.credentialsService.credentials;
        if(currentUserCredentials){
         this.credentialJson = JSON.stringify(currentUserCredentials);
        
            request = request.clone({
                setHeaders: {
                    Authorization: `${this.credentialJson}`
                }
            });
        }

        return next.handle(request);
    }
}