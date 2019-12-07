import { Component, ChangeDetectorRef, OnDestroy , OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CredentialsService } from './services/credentials.service';
import {Router} from "@angular/router";
import { Observable, of } from 'rxjs';
import { Credentials } from './models/credentials';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy , OnInit{
  viewportMobileQuery: MediaQueryList;

  private _viewportQueryListener: () => void;
  isLogged$ : Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  isLoggedOut : boolean;
  private credentials: Credentials | null = null;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private credentialsService: CredentialsService,
    private router: Router
    ) {
    this.viewportMobileQuery = media.matchMedia('(max-width: 600px)');
    this._viewportQueryListener = () => changeDetectionRef.detectChanges();
    this.viewportMobileQuery.addEventListener('change', this._viewportQueryListener);
    this.credentialsService.credentialEmitter.subscribe(credentialsE => {
      this.credentials = credentialsE;
      if(this.credentials){
      this.isLogged$ = of(true);
      this.isLoggedOut = false;
      }else{
        this.isLogged$ = of(false); 
        this.isLoggedOut = true;
      }
    });
   }

  ngOnInit() {
    this.isLogged$ = this.credentialsService.isAuthenticated();
    this.isLogged$.subscribe(res =>   res == true ? this.isLoggedOut = false : this.isLoggedOut = true);
   
    //console.log('is authentik in header: ' + this.isLogged$)
  }

  ngOnDestroy(): void {
    this.viewportMobileQuery.removeEventListener('change', this._viewportQueryListener);
  }
  
  login(){
    this.router.navigate(['login']);
  }

  logout() {
    //this.store.dispatch(authLogout());
    this.credentialsService.logout();
   // this.updateMenu();
   this.credentials = null;
   this.credentialsService.credentialsEEmitChange(this.credentials);
   this.isLoggedOut = true;
   this.router.navigate(['login']);
   console.log('it has been logged out')
  }


  
}
