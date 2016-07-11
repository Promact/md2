import { ACCORDION_DIRECTIVES } from '../accordion/accordion';
import { Md2Autocomplete } from '../autocomplete/autocomplete';
import { Md2Collapse } from '../collapse/collapse';
import { Md2Colorpicker, Md2ColorpickerService } from '../colorpicker/colorpicker';
import { DIALOG_DIRECTIVES, DIALOG_PROVIDERS } from '../dialog/dialog';
import { MENU_DIRECTIVES } from '../menu/menu';
import { Md2Multiselect } from '../multiselect/multiselect';
import { SELECT_DIRECTIVES } from '../select/select';
import { Md2Switch } from '../switch/switch';
import { TABS_DIRECTIVES } from '../tabs/tabs';
import { Md2Tags } from '../tags/tags';
import { Md2Toast } from '../toast/toast';
import { TOOLTIP_DIRECTIVES } from '../tooltip/tooltip';

export * from '../accordion/accordion';
export * from '../autocomplete/autocomplete';
export * from '../collapse/collapse';
export * from '../colorpicker/colorpicker';
export * from '../dialog/dialog';
export * from '../menu/menu';
export * from '../multiselect/multiselect';
export * from '../select/select';
export * from '../switch/switch';
export * from '../tabs/tabs';
export * from '../tags/tags';
export * from '../toast/toast';
export * from '../tooltip/tooltip';

export const MD2_ALL_DIRECTIVES: Array<any> = [ACCORDION_DIRECTIVES, Md2Autocomplete, Md2Collapse, Md2Colorpicker, Md2ColorpickerService, DIALOG_DIRECTIVES, DIALOG_PROVIDERS, MENU_DIRECTIVES, Md2Multiselect, SELECT_DIRECTIVES, Md2Switch, TABS_DIRECTIVES, Md2Tags, Md2Toast, TOOLTIP_DIRECTIVES];