import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'home',
  template: `
    <h4>Angular2 based Material Design components, directives and services are Accordion, Autocomplete, Collapse, Colorpicker, Datepicker, Dialog(Modal), Menu, Multiselect, Select, Tabs, Toast and Tooltip.</h4>
    <hr>
    <div class="home-page">
      <a button="primary" href="https://github.com/Promact/md2">View on GitHub</a>
      <a button="primary" href="https://github.com/Promact/md2/zipball/master">Download .zip</a>
      <a button="primary" href="https://github.com/Promact/md2/tarball/master">Download .tar.gz</a>
      <h1>Getting started</h1>
      <h4>Dependencies</h4>
      <p>This module consists of native Angular2 components, directives and services, no jQuery, Material or Bootstrap javascript is required.</p>
      <p>Plus this module plays nice with Material Design CSS</p>
      <h4>Installation</h4>
      <p>Currently preferable way to install this module is <code>npm</code>:</p>
      <pre class="language-bash"><code class="language-bash">npm <span class="token function">install</span> --save md2</code></pre>
      <h4>Reading documentation</h4>
      <p>Each <code>MD2</code> components has api and annotation docs, examples and working demo. Each <code>property</code> and <code>event</code> has type annotation and default value if any.</p>
    </div>
  `
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
  private isSidenavOpened: boolean = false;
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
    { name: 'Multiselect', route: 'multiselect' },
    { name: 'Select', route: 'select' },
    { name: 'Tabs', route: 'tabs' },
    { name: 'Tags', route: 'tags' },
    { name: 'Toast', route: 'toast' },
    { name: 'Tooltip', route: 'tooltip' },
  ];

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
    return this.location.path() === '/' + path;
  }

  private get window(): Window { return window; }
}
