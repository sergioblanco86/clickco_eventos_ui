import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'cce-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

  title = '';
  loggedInUser: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  subs: Subscription[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.subs.push(
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      ).subscribe((event) => this.title = event.title)
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }

}
