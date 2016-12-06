import {
  Component,
  Injectable,
  NgModule,
  ModuleWithProviders,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Overlay,
  OverlayState,
  OverlayRef,
  ComponentPortal,
  OVERLAY_PROVIDERS
} from '../core';

export class Toast {
  id: number;
  isVisible: boolean;
  constructor(public message: string) { }
}

@Injectable()
export class Md2Toast {
  private duration: number = 3000;
  private index: number = 0;

  _overlayRef: OverlayRef;
  _toastInstance: Md2ToastComponent;

  constructor(private _overlay: Overlay) { }

  /**
   * toast message
   * @param toast string or object with message and other properties of toast
   */
  toast(message: string, duration?: number) {
    this.show(message, duration);
  }

  /**
   * show toast
   * @param toastObj string or object with message and other properties of toast
   */
  show(message: string, duration?: number) {
    let toast: Toast;
    toast = new Toast(message);
    if (duration) { this.duration = duration; }

    if (toast) {
      if (!this._toastInstance) {
        let strategy = this._overlay.position().global().fixed().top('0').right('0');
        let config = new OverlayState();
        config.positionStrategy = strategy;

        this._overlayRef = this._overlay.create(config);
        let portal = new ComponentPortal(Md2ToastComponent);
        this._toastInstance = this._overlayRef.attach(portal).instance;

        this.setupToast(toast);

      } else {
        this.setupToast(toast);
      }
    }
  }

  /**
   * toast timeout
   * @param toastId
   */
  startTimeout(toastId: number) {
    setTimeout(() => {
      this.clear(toastId);
    }, this.duration);
  }

  /**
   * setup toast
   * @param toast
   */
  setupToast(toast: Toast) {
    toast.id = ++this.index;
    this._toastInstance.add(toast);
    this.startTimeout(toast.id);
  }

  /**
   * clear specific toast
   * @param toastId
   */
  clear(toastId: number) {
    if (this._toastInstance) {
      this._toastInstance.remove(toastId);
      setTimeout(() => {
        if (!this._toastInstance.hasToast()) { this.dispose(); }
      }, 250);

    }
  }

  /**
   * clear all toasts
   */
  clearAll() {
    if (this._toastInstance) {
      this._toastInstance.removeAll();
      setTimeout(() => {
        if (!this._toastInstance.hasToast()) { this.dispose(); }
      }, 250);

    }
  }

  /**
   * dispose all toasts
   */
  dispose() {
    this._overlayRef.dispose();
    this._overlayRef = null;
    this._toastInstance = null;
  }

}

@Component({
  selector: 'md2-toast',
  template: `
    <div *ngFor="let toast of toasts" class="md2-toast" [class.in]="toast.isVisible" (click)="remove(toast.id)">{{toast.message}}</div>
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

export const MD2_TOAST_DIRECTIVES: any[] = [Md2ToastComponent];

@NgModule({
  imports: [CommonModule],
  exports: MD2_TOAST_DIRECTIVES,
  declarations: MD2_TOAST_DIRECTIVES,
  entryComponents: MD2_TOAST_DIRECTIVES
})
export class Md2ToastModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2ToastModule,
      providers: [Md2Toast, OVERLAY_PROVIDERS]
    };
  }
}
