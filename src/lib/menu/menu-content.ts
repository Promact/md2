import {
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: '[md2-menu-content]',
  host: { 'role': 'menu' },
  templateUrl: 'menu-content.html',
  styleUrls: ['menu.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Md2MenuContent {
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
}
