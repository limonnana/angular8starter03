import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  viewportMobileQuery: MediaQueryList;

  private _viewportQueryListener: () => void;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.viewportMobileQuery = media.matchMedia('(max-width: 600px)');
    this._viewportQueryListener = () => changeDetectionRef.detectChanges();
    this.viewportMobileQuery.addListener(this._viewportQueryListener);
  }

  ngOnDestroy(): void {
    this.viewportMobileQuery.removeListener(this._viewportQueryListener);
  }
}
