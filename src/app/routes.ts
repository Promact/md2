
import {RouterConfig} from '@angular/router';
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

export const routes: RouterConfig = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'accordion', component: Accordion },
  { path: 'autocomplete', component: Autocomplete },
  { path: 'collapse', component: Collapse },
  { path: 'colorpicker', component: Colorpicker },
  { path: 'datepicker', component: Datepicker },
  { path: 'dialog', component: DialogComponent },
  { path: 'menu', component: Menu },
  { path: 'multiselect', component: Multiselect },
  { path: 'select', component: Select },
  { path: 'switch', component: Switch },
  { path: 'tabs', component: Tabs },
  { path: 'tags', component: Tags },
  { path: 'toast', component: Toast },
  { path: 'tooltip', component: Tooltip }
];
