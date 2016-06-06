import {Injectable, ComponentRef, DynamicComponentLoader, ApplicationRef, Inject, Optional, provide, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import {ViewContainerRef_} from '@angular/core/src/linker/view_container_ref';
import {Md2ToastComponent} from './toast.component';

@Injectable()
export class Md2Toast {
  private hideDelay: number = 3000;
  private index: number = 0;

  container: ComponentRef<any>;

  constructor(private loader: DynamicComponentLoader, private appRef: ApplicationRef) { }

  show(toastObj: string | { message: string, hideDelay: number }) {
    let toast;
    if (typeof toastObj === 'string') {
      toast = new Toast(toastObj);
    } else if (typeof toastObj === 'object') {
      toast = new Toast(toastObj.message);
      this.hideDelay = toastObj.hideDelay;
    }
    if (toast) {
      if (!this.container) {
        let appElement: ViewContainerRef = new ViewContainerRef_(this.appRef['_rootComponents'][0]._hostElement);
        let bindings = ReflectiveInjector.resolve([]);
        this.loader.loadNextToLocation(Md2ToastComponent, appElement, bindings).then((ref) => {
          this.container = ref;
          this.setupToast(toast);
        });
      } else {
        this.setupToast(toast);
      }
    }
  }

  startTimeout(toastId: number) {
    setTimeout(() => {
      this.clear(toastId);
    }, this.hideDelay);
  }

  setupToast(toast: Toast) {
    toast.id = ++this.index;
    this.container.instance.add(toast);
    this.startTimeout(toast.id);
  }

  clear(toastId: number) {
    if (this.container) {
      let instance = this.container.instance;
      instance.remove(toastId);
      if (!instance.isToast()) { this.hide(); }
    }
  }

  hide() {
    this.container.destroy();
    this.container = null;
  }
}

export class Toast {
  id: number;
  message: string;
  constructor(message: string) { this.message = message; }
}
