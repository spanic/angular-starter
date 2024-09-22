import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationHelperSevice {
  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap(() => (this.previousUrl = this.currentUrl))
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  back(): void {
    this.router.navigateByUrl(this.previousUrl ?? '/');
  }
}
