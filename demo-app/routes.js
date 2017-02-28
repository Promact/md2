"use strict";
var demo_app_1 = require('./demo-app');
var accordion_demo_1 = require('../accordion/accordion-demo');
var autocomplete_demo_1 = require('../autocomplete/autocomplete-demo');
var chips_demo_1 = require('../chips/chips-demo');
var collapse_demo_1 = require('../collapse/collapse-demo');
var colorpicker_demo_1 = require('../colorpicker/colorpicker-demo');
var data_table_demo_1 = require('../data-table/data-table-demo');
var datepicker_demo_1 = require('../datepicker/datepicker-demo');
var dialog_demo_1 = require('../dialog/dialog-demo');
var menu_demo_1 = require('../menu/menu-demo');
var select_demo_1 = require('../select/select-demo');
var tabs_demo_1 = require('../tabs/tabs-demo');
var tags_demo_1 = require('../tags/tags-demo');
var toast_demo_1 = require('../toast/toast-demo');
var tooltip_demo_1 = require('../tooltip/tooltip-demo');
exports.DEMO_APP_ROUTES = [
    { path: '', component: demo_app_1.Home },
    { path: 'accordion', component: accordion_demo_1.AccordionDemo },
    { path: 'autocomplete', component: autocomplete_demo_1.AutocompleteDemo },
    { path: 'chips', component: chips_demo_1.ChipsDemo },
    { path: 'collapse', component: collapse_demo_1.CollapseDemo },
    { path: 'colorpicker', component: colorpicker_demo_1.ColorpickerDemo },
    { path: 'datatable', component: data_table_demo_1.DataTableDemo },
    { path: 'datepicker', component: datepicker_demo_1.DatepickerDemo },
    { path: 'dialog', component: dialog_demo_1.DialogDemo },
    { path: 'menu', component: menu_demo_1.MenuDemo },
    { path: 'select', component: select_demo_1.SelectDemo },
    { path: 'tabs', component: tabs_demo_1.TabsDemo },
    { path: 'tags', component: tags_demo_1.TagsDemo },
    { path: 'toast', component: toast_demo_1.ToastDemo },
    { path: 'tooltip', component: tooltip_demo_1.TooltipDemo },
];
//# sourceMappingURL=routes.js.map