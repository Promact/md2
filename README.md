# md2

Angular2 based Material Design components, directives and services are Accordion, Autocomplete, Collapse, Colorpicker, Datepicker, Dialog(Modal), Menu, Multiselect, Select, Switch, Tabs, Tags(Chips), Toast and Tooltip.

[![Build Status](https://travis-ci.org/Promact/md2.svg?branch=master)](https://travis-ci.org/Promact/md2)

## Quick start

1. A recommended way to install ***md2*** is through [npm](https://www.npmjs.com/package/md2) package manager using the following command:

  `npm install md2 --save`

2. Set `md2` in your project
system.config.js
```js
{
  map: {
    'md2': 'node_modules/md2'
  },
  packages: {
    'md2/select': {
      format: 'cjs',
      defaultExtension: 'js',
      main: 'select.js'
    },
    'md2/switch': {
      format: 'cjs',
      defaultExtension: 'js',
      main: 'switch.js'
    },
    //...
	   
    //--- or ---
	   
    'md2/all': {
      format: 'cjs',
      defaultExtension: 'js',
      main: 'all.js'
    }
  }
}
```

3. More information regarding of using ***md2*** is located in
  [demo](http://promact.github.io/md2) and [demo sources](https://github.com/promact/md2/tree/master/src).


## Components

- [md2-accordion](https://github.com/promact/md2/tree/master/src/components/accordion)
- [md2-autocomplete](https://github.com/promact/md2/tree/master/src/components/autocomplete)
- [md2-collapse](https://github.com/promact/md2/tree/master/src/components/collapse)
- [md2-colorpicker](https://github.com/promact/md2/tree/master/src/components/colorpicker)
- md2-datepicker(Coming soon!)
- [md2-dialog](https://github.com/promact/md2/tree/master/src/components/dialog)
- [md2-menu](https://github.com/promact/md2/tree/master/src/components/menu)
- [md2-multiselect](https://github.com/promact/md2/tree/master/src/components/multiselect)
- [md2-select](https://github.com/promact/md2/tree/master/src/components/select)
- [md2-switch](https://github.com/promact/md2/tree/master/src/components/switch)
- [md2-tabs](https://github.com/promact/md2/tree/master/src/components/tabs)
- [md2-tags](https://github.com/promact/md2/tree/master/src/components/tags)
- [md2-toast](https://github.com/promact/md2/tree/master/src/components/toast)
- [md2-tooltip](https://github.com/promact/md2/tree/master/src/components/tooltip)
