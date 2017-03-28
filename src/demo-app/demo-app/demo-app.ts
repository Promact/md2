import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.html',
})
export class Home { }

@Component({
  moduleId: module.id,
  selector: 'demo-app',
  providers: [],
  templateUrl: 'demo-app.html',
  encapsulation: ViewEncapsulation.None,
})
export class DemoApp {
  isSidenavOpened: boolean = false;
  footerNav: any = { prev: null, next: null };
  navItems = [
    { name: 'Accordion', route: 'accordion' },
    { name: 'Autocomplete', route: 'autocomplete' },
    { name: 'Chips', route: 'chips' },
    { name: 'Collapse', route: 'collapse' },
    { name: 'Colorpicker', route: 'colorpicker' },
    { name: 'Data Table', route: 'datatable' },
    { name: 'Datepicker', route: 'datepicker' },
    { name: 'Dialog', route: 'dialog' },
    { name: 'Menu', route: 'menu' },
    { name: 'Select', route: 'select' },
    { name: 'Tabs', route: 'tabs' },
    { name: 'Tags', route: 'tags' },
    { name: 'Toast', route: 'toast' },
    { name: 'Tooltip', route: 'tooltip' },
  ];

  constructor(private location: Location, private _router: Router) {
    _router.events.subscribe((value) => {
      let current = this.navItems.map((v) => '/' + v.route).indexOf((value as any).url);
      this.footerNav.prev = this.navItems[current - 1];
      this.footerNav.next = this.navItems[current + 1];
      if (current === 0) { this.footerNav.prev = { name: 'Home', route: '' }; }
    });
  }

  ngOnInit() {
    console.log('Application component initialized ...');
  }

  sidenavToggle() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  sidenav(state: boolean) {
    this.isSidenavOpened = state;
    if (this.isSidenavOpened && this.window.innerWidth > 767) {
      this.isSidenavOpened = false;
    }
  }

  isActive(path: string) {
    return this.location.path() === '/' + path;
  }

  private get window(): Window { return window; }
}
