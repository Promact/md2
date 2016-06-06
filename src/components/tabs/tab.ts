import {Component, Input} from '@angular/core';

@Component({
  selector: 'md2-tab',
  template: `
    <div class="md2-tab-content" [style.display]="active ? 'block' : 'none'">
      <ng-content></ng-content>
    </div>
  `
})
export class Md2Tab {

  @Input() header: string;

  @Input() active: boolean;

  @Input() disabled: boolean;

  @Input('header-class') headerClass: string;
}