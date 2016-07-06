import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Md2Dialog} from './dialog';

@Component({
  selector: 'md-dialog-title',
  template: `<h2 *ngIf="title">{{title}}</h2><ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Md2DialogTitle {
  @Input() title: string;
}
