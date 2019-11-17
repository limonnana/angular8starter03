import { Component, ChangeDetectorRef, OnDestroy , OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CredentialsService } from './services/credentials.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy , OnInit{
  viewportMobileQuery: MediaQueryList;

  private _viewportQueryListener: () => void;
  isLogged: boolean;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private credentialsService: CredentialsService,
    private router: Router
    ) {
    this.viewportMobileQuery = media.matchMedia('(max-width: 600px)');
    this._viewportQueryListener = () => changeDetectionRef.detectChanges();
    this.viewportMobileQuery.addEventListener('change', this._viewportQueryListener);
   }

  ngOnInit() {
    this.isLogged = this.credentialsService.isAuthenticated();
    console.log('is authentik in header: ' + this.isLogged)
  }

  ngOnDestroy(): void {
    this.viewportMobileQuery.removeEventListener('change', this._viewportQueryListener);
  }

  logout() {
    //this.store.dispatch(authLogout());
    this.credentialsService.logout();
   // this.updateMenu();
   this.router.navigate(['login']);
   console.log('it has been logged out')
  }


  
}
