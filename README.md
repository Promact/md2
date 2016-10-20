# MD2

Angular2 based Material Design components, directives and services are Accordion, Autocomplete, Collapse, Colorpicker, Datepicker, Dialog(Modal), Menu, Multiselect, Select, Tabs, Tags(Chips), Toast and Tooltip.

[![Build Status](https://travis-ci.org/Promact/md2.svg?branch=master)](https://travis-ci.org/Promact/md2)

## Quick start

1. A recommended way to install ***md2*** is through [npm](https://www.npmjs.com/package/md2) package manager using the following command:

  `npm install md2 --save`

2. Setup `MD2` in your project
```ts
// system.config.js
// ================
{
  map: {
    'md2': 'node_modules/md2'
  },
  packages: {
    'md2': {
      main: 'all.js',
      defaultExtension: 'js'
    }
  }
}


// app.module.ts
// =============

import { Md2Module }  from 'md2';
@NgModule({
  imports: [
    ...,
    Md2Module.forRoot(),
  ],
  ...
})
export class AppModule { }

```

3. More information regarding of using ***md2*** is located in
  [demo](http://code.promactinfo.com/md2) and [demo sources](https://github.com/Promact/md2/tree/master/src/demo-app).


### Components:

- [md2-accordion](https://github.com/Promact/md2/tree/master/src/lib/accordion)
- [md2-autocomplete](https://github.com/Promact/md2/tree/master/src/lib/autocomplete)
- [md2-collapse](https://github.com/Promact/md2/tree/master/src/lib/collapse)
- [md2-colorpicker](https://github.com/Promact/md2/tree/master/src/lib/colorpicker)
- [md2-data-table](https://github.com/Promact/md2/tree/master/src/lib/data-table)
- [md2-datepicker](https://github.com/Promact/md2/tree/master/src/lib/datepicker)
- [md2-dialog](https://github.com/Promact/md2/tree/master/src/lib/dialog)
- [md2-menu](https://github.com/Promact/md2/tree/master/src/lib/menu)
- [md2-multiselect](https://github.com/Promact/md2/tree/master/src/lib/multiselect)
- [md2-select](https://github.com/Promact/md2/tree/master/src/lib/select)
- [md2-tabs](https://github.com/Promact/md2/tree/master/src/lib/tabs)
- [md2-tags](https://github.com/Promact/md2/tree/master/src/lib/tags)
- [md2-toast](https://github.com/Promact/md2/tree/master/src/lib/toast)
- [md2-tooltip](https://github.com/Promact/md2/tree/master/src/lib/tooltip)
