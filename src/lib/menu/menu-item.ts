import {
  Component,
  ContentChild,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { Md2MenuContent } from './menu-content';
import { Md2MenuTrigger } from './menu-trigger';

@Component({
  moduleId: module.id,
  selector: '[md2-menu-item]',
  host: {
    'role': 'menuitem'
  },
  template: '<ng-content></ng-content>'
})
export class Md2MenuItem { }
