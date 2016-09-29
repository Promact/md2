import {Routes} from '@angular/router';
import {Home} from './demo-app';
import {AccordionDemo} from '../accordion/accordion-demo';
import {AutocompleteDemo} from '../autocomplete/autocomplete-demo';
import {CollapseDemo} from '../collapse/collapse-demo';
import {ColorpickerDemo} from '../colorpicker/colorpicker-demo';
import {DatepickerDemo} from '../datepicker/datepicker-demo';
import {DialogDemo} from '../dialog/dialog-demo';
import {MenuDemo} from '../menu/menu-demo';
import {MultiselectDemo} from '../multiselect/multiselect-demo';
import {SelectDemo} from '../select/select-demo';
import {TabsDemo} from '../tabs/tabs-demo';
import {TagsDemo} from '../tags/tags-demo';
import {ToastDemo} from '../toast/toast-demo';
import {TooltipDemo} from '../tooltip/tooltip-demo';


export const DEMO_APP_ROUTES: Routes = [
  { path: '', component: Home },
  { path: 'accordion', component: AccordionDemo },
  { path: 'autocomplete', component: AutocompleteDemo },
  { path: 'collapse', component: CollapseDemo },
  { path: 'colorpicker', component: ColorpickerDemo },
  { path: 'datepicker', component: DatepickerDemo },
  { path: 'dialog', component: DialogDemo },
  { path: 'menu', component: MenuDemo },
  { path: 'multiselect', component: MultiselectDemo },
  { path: 'select', component: SelectDemo },
  { path: 'tabs', component: TabsDemo },
  { path: 'tags', component: TagsDemo },
  { path: 'toast', component: ToastDemo },
  { path: 'tooltip', component: TooltipDemo },
];
