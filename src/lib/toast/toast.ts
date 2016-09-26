import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Optional,
  ReflectiveInjector,
  ViewContainerRef,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Md2ToastComponent } from './toast.component';

export class Toast {
  id: number;
  constructor(public message: string) { }
}

@Injectable()
export class Md2Toast {
  private delay: number = 3000;
  private index: number = 0;

  container: ComponentRef<any>;

  constructor(private _componentFactory: ComponentFactoryResolver, private _appRef: ApplicationRef) { }

  /**
   * toast message
   * @param toast string or object with message and other properties of toast
   */
  toast(toast: string | { message: string, hideDelay: number }) {
    this.show(toast);
  }

  /**
   * show toast
   * @param toastObj string or object with message and other properties of toast
   */
  show(toastObj: string | { message: string, hideDelay: number }) {
    let toast: Toast;
    if (typeof toastObj === 'string') {
      toast = new Toast(toastObj);
    } else if (typeof toastObj === 'object') {
      toast = new Toast(toastObj.message);
      this.delay = toastObj.hideDelay;
    }
    if (toast) {
      if (!this.container) {
        let app: any = this._appRef;
        let appContainer: ViewContainerRef = app['_rootComponents'][0]['_hostElement'].vcRef;

        let providers = ReflectiveInjector.resolve([]);

        let toastFactory = this._componentFactory.resolveComponentFactory(Md2ToastComponent);
        let childInjector = ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
        this.container = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
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
    }, this.delay);
  }

  /**
   * setup toast
   * @param toast
   */
  setupToast(toast: Toast) {
    toast.id = ++this.index;
    this.container.instance.add(toast);
    this.startTimeout(toast.id);
  }

  /**
   * clear specific toast
   * @param toastId
   */
  clear(toastId: number) {
    if (this.container) {
      let instance = this.container.instance;
      instance.remove(toastId);
      if (!instance.hasToast()) {
        this.dispose();
      }
    }
  }

  /**
   * clear all toasts
   */
  clearAll() {
    if (this.container) {
      let instance = this.container.instance;
      instance.removeAll();
      if (!instance.hasToast()) {
        this.dispose();
      }
    }
  }

  /**
   * dispose all toasts
   */
  dispose() {
    this.container.destroy();
    this.container = null;
  }

}

export const MD2_TOAST_DIRECTIVES: any[] = [Md2ToastComponent];

@NgModule({
  imports: [CommonModule],
  declarations: MD2_TOAST_DIRECTIVES,
  exports: MD2_TOAST_DIRECTIVES,
  providers: [Md2Toast],
  entryComponents: MD2_TOAST_DIRECTIVES
})
export class Md2ToastModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2ToastModule,
      providers: []
    };
  }
}
