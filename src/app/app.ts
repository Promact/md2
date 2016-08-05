import {Component, OnInit} from "@angular/core";
import {RouterLink, ROUTER_DIRECTIVES} from "@angular/router";
import {Location} from "@angular/common";

import { Home } from './home';
import { Accordion } from './components/accordion/accordion';
import { Autocomplete } from './components/autocomplete/autocomplete';
import { Collapse } from './components/collapse/collapse';
import { Colorpicker } from './components/colorpicker/colorpicker';
import { Datepicker } from './components/datepicker/datepicker';
import { DialogComponent } from './components/dialog/dialog';
import { Menu } from './components/menu/menu';
import { Multiselect } from './components/multiselect/multiselect';
import { Select } from './components/select/select';
import { Switch } from './components/switch/switch';
import { Tabs } from './components/tabs/tabs';
import { Tags } from './components/tags/tags';
import { Toast } from './components/toast/toast';
import { Tooltip } from './components/tooltip/tooltip';

@Component({
  selector: "md2-app",
  templateUrl: "./app/app.html",
  directives: [Home, Accordion, Autocomplete, Collapse, Colorpicker, Datepicker, DialogComponent, Menu, Multiselect, Select, Switch, Tabs, Tags, Toast, Tooltip, RouterLink, ROUTER_DIRECTIVES]
})

export class AppComponent implements OnInit {
  private isSidenavOpened: boolean = false;

  constructor(private location: Location) { }

  ngOnInit() {
    console.log("Application component initialized ...");
  }

  sidenavToggle() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  isActive(path: string) {
    return this.location.path().startsWith(path);
  }
}
