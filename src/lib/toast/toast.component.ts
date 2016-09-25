import {
  Component,
  Inject,
  Optional,
  ViewEncapsulation,
  transition, state, trigger, style, animate
} from '@angular/core';
import { Toast } from './toast';

@Component({
  selector: 'md2-toast',
  template: `
    <div class="md2-toast-wrapper">
      <div *ngFor="let toast of toasts" class="md2-toast" [@inOut]="animate" (click)="remove(toast.id)">
        <div class="md2-toast-message">{{toast.message}}</div>
      </div>
    </div>
  `,
  styles: [`
    .md2-toast-wrapper { position: fixed; top: 0; right: 0; z-index: 1060; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; cursor: default; overflow: hidden; min-width: 304px; padding: 8px; -moz-transition: all .4s cubic-bezier(.25,.8,.25,1); -o-transition: all .4s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .4s cubic-bezier(.25,.8,.25,1); transition: all .4s cubic-bezier(.25,.8,.25,1); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-toast { position: relative; padding: 14px 24px; margin-bottom: 5px; display: block; background-color: #323232; color: #fafafa; box-shadow: 0 2px 5px 0 rgba(0,0,0,.26); border-radius: 2px; font-size: 14px; overflow: hidden; -ms-word-wrap: break-word; word-wrap: break-word; -moz-transition: all .4s cubic-bezier(.25,.8,.25,1); -o-transition: all .4s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .4s cubic-bezier(.25,.8,.25,1); transition: all .4s cubic-bezier(.25,.8,.25,1); }
    .md2-toast-message { display: block; }
  `],
  animations: [
    trigger('inOut', [
      state('top', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => top', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('top => void', [
        animate('0.2s ease-out',
          style({
            opacity: 0,
            transform: 'translateY(-100%)'
          }))
      ]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class Md2ToastComponent {
  toasts: Toast[] = [];
  maxShown = 5;
  animate: string = 'top';

  /**
   * add toast
   * @param toast toast object with all parameters
   */
  add(toast: Toast) {
    this.toasts.push(toast);
    if (this.toasts.length > this.maxShown) {
      this.toasts.splice(0, (this.toasts.length - this.maxShown));
    }
  }

  /**
   * remove toast
   * @param toastId number of toast id
   */
  remove(toastId: number) {
    this.toasts = this.toasts.filter((toast) => { return toast.id !== toastId; });
  }

  /**
   * remove all toasts
   * @param toastId number of toast id
   */
  removeAll(toastId: number) {
    this.toasts = [];
  }

  /**
   * check has any toast
   * @return boolean
   */
  hasToast(): boolean { return this.toasts.length > 0; }

}
