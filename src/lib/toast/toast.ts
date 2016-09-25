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

//@Injectable()
//export class Md2Toast {
//  private hideDelay: number = 3000;
//  private index: number = 0;

//  container: ComponentRef<any>;

//  private appRef: any;

//  constructor(private _viewContainer: ViewContainerRef, private _componentsHelper: ComponentsHelper, appRef: ApplicationRef, private _compiler: Compiler) {
//    this.appRef = appRef;
//  }

//  /**
//   * show toast
//   * @param toastObj string or object with message and other properties of toast
//   */
//  show(toastObj: string | { message: string, hideDelay: number }) {
//    let toast: Toast;
//    if (typeof toastObj === 'string') {
//      toast = new Toast(toastObj);
//    } else if (typeof toastObj === 'object') {
//      toast = new Toast(toastObj.message);
//      this.hideDelay = toastObj.hideDelay;
//    }
//    if (toast) {
//      if (!this.container) {
//        //let appElement: ViewContainerRef = new ViewContainerRef_(this.appRef['_rootComponents'][0]._hostElement);
//        let bindings = ReflectiveInjector.resolve([]);

//        this._compiler.compileModuleAsync(Md2ToastComponent)
//          .then((factory: ComponentFactory<any>) => {

//            this._viewContainer.createComponent(factory);
//            //this.container = this._componentsHelper
//            //.appendNextToRoot(Md2TooltipComponent, this.viewContainerRef, binding);
//            //.appendNextToLocation(Md2ToastComponent, appElement, bindings);
//            //this.loader.loadNextToLocation(Md2ToastComponent, appElement, bindings).then((ref: any) => {
//            //  this.container = ref;
//            //  this.setupToast(toast);
//            //});
//          });
//      } else {
//        this.setupToast(toast);
//      }
//    }
//  }

//  /**
//   * toast timeout
//   * @param toastId
//   */
//  startTimeout(toastId: number) {
//    setTimeout(() => {
//      this.clear(toastId);
//    }, this.hideDelay);
//  }

//  /**
//   * setup toast
//   * @param toast
//   */
//  setupToast(toast: Toast) {
//    toast.id = ++this.index;
//    this.container.instance.add(toast);
//    this.startTimeout(toast.id);
//  }

//  /**
//   * clear all toast
//   * @param toastId
//   */
//  clear(toastId: number) {
//    if (this.container) {
//      let instance = this.container.instance;
//      instance.remove(toastId);
//      if (!instance.isToast()) { this.hide(); }
//    }
//  }

//  /**
//   * hide all or specific toasts
//   */
//  hide() {
//    this.container.destroy();
//    this.container = null;
//  }
//}



@Injectable()
export class Md2ToastOptions {
  maxShown: number;
  toastLife: number;
  constructor(options: Object) {
    Object.assign(this, options);
  }
}

export class Toast {
  id: number;

  constructor(public message: string) { }
}

@Injectable()
export class Md2Toast {
  container: ComponentRef<any>;
  private options = {
    toastLife: 3000,
  };
  private index = 0;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    @Optional() options: Md2ToastOptions) {
    if (options) {
      Object.assign(this.options, options);
    }
  }

  toast(toast: string | { message: string, hideDelay: number }) {
    this.show(toast);
  }


  show(toastObj: string | { message: string, hideDelay: number }) {
    let toast: Toast;
    if (typeof toastObj === 'string') {
      toast = new Toast(toastObj);
    } else if (typeof toastObj === 'object') {
      toast = new Toast(toastObj.message);
      //this.hideDelay = toastObj.hideDelay;
      this.options.toastLife = toastObj.hideDelay;
    }
    if (toast) {

      //show(toast: string | { message: string, hideDelay: number }) {//show(toast: Toast, options?: any) {
      if (!this.container) {
        // get app root view component ref
        let app: any = this.appRef;
        let appContainer: ViewContainerRef = app['_rootComponents'][0]['_hostElement'].vcRef;

        // get options providers
        let providers = ReflectiveInjector.resolve([
          { provide: Md2ToastOptions, useValue: <Md2ToastOptions>this.options }
        ]);

        // create and load Md2ToastComponent
        let toastFactory = this.componentFactoryResolver.resolveComponentFactory(Md2ToastComponent);
        let childInjector = ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
        this.container = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
        this.setupToast(toast);

      } else {
        this.setupToast(toast);
      }
    }
  }

  createTimeout(toastId: number, timeout?: number) {
    const life = timeout || this.options.toastLife;

    setTimeout(() => {
      this.clearToast(toastId);
    }, life);
  }

  setupToast(toast: Toast) {
    toast.id = ++this.index;

    //if (options && typeof (options.toastLife) === 'number') {
    //  this.createTimeout(toast.id, options.toastLife);
    //} else {
    //  this.createTimeout(toast.id);
    //}

    this.container.instance.add(toast);
  }

  clearToast(toastId: number) {
    if (this.container) {
      let instance = this.container.instance;
      instance.remove(toastId);
      if (!instance.hasToast()) {
        this.dispose();
      }
    }
  }

  clearAllToasts() {
    if (this.container) {
      let instance = this.container.instance;
      instance.removeAll();
      if (!instance.hasToast()) {
        this.dispose();
      }
    }
  }

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
      providers: [{
        provide: Md2ToastOptions, useValue: {
          animate: 'top'
        }
      }]
    };
  }
}
