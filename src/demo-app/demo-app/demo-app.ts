import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'home',
  template: `
    <p>Welcome to the development demos for Angular Material 2!</p>
    <p>Open the sidenav to select a demo. </p>
  `
})
export class Home { }

@Component({
  moduleId: module.id,
  selector: 'demo-app',
  providers: [],
  templateUrl: 'demo-app.html',
  styleUrls: ['demo-app.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoApp {
  private isSidenavOpened: boolean = false;

  constructor(private location: Location) { }

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
    return this.location.path() === path;
  }

  private get window(): Window { return window; }
}
