# MD2

Angular2 based Material Design components, directives and services are Accordion, Autocomplete, Chips(Tags), Collapse, Colorpicker, Data Table, Datepicker, Dialog(Modal), Menu, Multiselect, Select, Tabs, Tags(Chips), Toast and Tooltip.

[![npm version](https://badge.fury.io/js/md2.svg)](https://www.npmjs.com/package/md2)
[![Build Status](https://travis-ci.org/Promact/md2.svg?branch=master)](https://travis-ci.org/Promact/md2)

### Installation

The latest release of MD2 can be installed from npm

`npm install --save md2`

Playing with the latest changes from [master](https://github.com/Promact/md2/tree/master) is also possible

`npm install --save https://github.com/Promact/md2.git`

### Getting started

Setup `MD2` in your project

```ts
// system.config.js
// ================
{
  map: {
    'md2': 'node_modules/md2/bundles/md2.umd.js'
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

### Demo

[demo](http://code.promactinfo.com/md2) and [demo sources](https://github.com/Promact/md2/tree/master/src/demo-app).


### Components:

- [md2-accordion](https://github.com/Promact/md2/tree/master/src/lib/accordion)
- [md2-autocomplete](https://github.com/Promact/md2/tree/master/src/lib/autocomplete)
- [md2-chips](https://github.com/Promact/md2/tree/master/src/lib/chips)
- [md2-collapse](https://github.com/Promact/md2/tree/master/src/lib/collapse)
- [md2-colorpicker](https://github.com/Promact/md2/tree/master/src/lib/colorpicker)
- [md2-data-table](https://github.com/Promact/md2/tree/master/src/lib/data-table)
- [md2-datepicker](https://github.com/Promact/md2/tree/master/src/lib/datepicker)
- [md2-dialog](https://github.com/Promact/md2/tree/master/src/lib/dialog)
- [md2-menu](https://github.com/Promact/md2/tree/master/src/lib/menu)
- [md2-select](https://github.com/Promact/md2/tree/master/src/lib/select)
- [md2-tabs](https://github.com/Promact/md2/tree/master/src/lib/tabs)
- [md2-tags](https://github.com/Promact/md2/tree/master/src/lib/tags)
- [md2-toast](https://github.com/Promact/md2/tree/master/src/lib/toast)
- [md2-tooltip](https://github.com/Promact/md2/tree/master/src/lib/tooltip)


## The goal of MD2
Our goal is to build a set of high-quality UI components built with Angular and TypeScript,
following the Material Design spec. These
components will serve as an example of how to write Angular code following best practices.

### What do we mean by "high-quality"?
* Internationalized and accessible so that all users can use them.
* Straightforward APIs that don't confuse developers.
* Behave as expected across a wide variety of use-cases without bugs.
* Behavior is well-tested with both unit and integration tests.
* Customizable within the bounds of the Material Design specification.
* Performance cost is minimized.
* Code is clean and well-documented to serve as an example for Angular devs.

## Browser and screen reader support
MD2 supports the most recent two versions of all major browsers:
Chrome (including Android), Firefox, Safari (including iOS), and IE11 / Edge

We also aim for great user experience with the following screen readers:
* NVDA and JAWS with IE / FF / Chrome (on Windows).
* VoiceOver with Safari on iOS and Safari / Chrome on OSX.
* TalkBack with Chrome on Android.
