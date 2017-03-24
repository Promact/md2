import { Directive } from '@angular/core';


/**
 * Fixed header that will be rendered above a select's options.
 */
@Directive({
  selector: 'md2-select-header',
  host: {
    'class': 'md2-select-header',
  }
})
export class Md2SelectHeader { }
