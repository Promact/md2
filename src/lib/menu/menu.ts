import {
  Component,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2MenuContent } from './menu-content';
import { Md2MenuItem } from './menu-item';
import { Md2MenuTrigger } from './menu-trigger';
export { Md2MenuContent } from './menu-content';
export { Md2MenuItem } from './menu-item';
export { Md2MenuTrigger } from './menu-trigger';


@Component({
  moduleId: module.id,
  selector: '[md2-menu]',
  template: '<ng-content></ng-content>',
  styleUrls: ['menu.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Md2Menu { }

@NgModule({
  imports: [CommonModule],
  exports: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
  declarations: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
})
export class Md2MenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2MenuModule,
    };
  }
}
