import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { Toast } from './toast';

@Component({
  selector: 'md2-toast',
  template: `
    <div class="md2-toast-wrapper">
      <div *ngFor="let toast of toasts" class="md2-toast" [class.in]="toast.isVisible" (click)="remove(toast.id)">{{toast.message}}</div>
    </div>
  `,
  styleUrls: ['toast.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Md2ToastComponent {
  toasts: Toast[] = [];
  maxShown = 5;

  /**
   * add toast
   * @param toast toast object with all parameters
   */
  add(toast: Toast) {
    setTimeout(() => {
      toast.isVisible = true;
    }, 1);
    this.toasts.push(toast);
    if (this.toasts.length > this.maxShown) {
      this.toasts[0].isVisible = false;
      setTimeout(() => {
        this.toasts.splice(0, (this.toasts.length - this.maxShown));
      }, 250);
    }
  }

  /**
   * remove toast
   * @param toastId number of toast id
   */
  remove(toastId: number) {
    this.toasts.forEach((t: any) => { if (t.id === toastId) { t.isVisible = false; } });
    setTimeout(() => {
      this.toasts = this.toasts.filter((toast) => { return toast.id !== toastId; });
    }, 250);
  }

  /**
   * remove all toasts
   * @param toastId number of toast id
   */
  removeAll() {
    this.toasts.forEach((t: any) => { t.isVisible = false; });
    setTimeout(() => {
      this.toasts = [];
    }, 250);
  }

  /**
   * check has any toast
   * @return boolean
   */
  hasToast(): boolean { return this.toasts.length > 0; }

}
