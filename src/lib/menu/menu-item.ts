import {
  Component,
  ContentChild,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { Md2MenuContent } from './menu-content';
import { Md2MenuTrigger } from './menu-trigger';

@Component({
  moduleId: module.id,
  selector: '[md2-menu-item]',
  host: {
    'role': 'menuitem'
  },
  template: '<ng-content></ng-content>'
})
export class Md2MenuItem {

  @ContentChild(Md2MenuTrigger) trigger: Md2MenuTrigger;
  @ContentChild(Md2MenuContent) menu: Md2MenuContent;

  constructor(private _element: ElementRef, private _viewContainerRef: ViewContainerRef) { }

  ngAfterContentInit() {
    if (this.trigger && this.menu) {
      this._viewContainerRef.createEmbeddedView(this.menu.templateRef);
      this.trigger.onMenuOpen.subscribe(() => {
        this._element.nativeElement.classList.add('open');
        let siblings = this.getSiblings(this._element.nativeElement);
        siblings.forEach((el: Element) => {
          el.classList.remove('open');
        });
      });
      this.trigger.onMenuClose.subscribe(() => {
        this._element.nativeElement.classList.remove('open');
      });
    }
  }

  getSiblings(elem: Element) {
    let siblings: Array<any> = [];
    let el = elem.parentNode.firstChild;
    for (; el; el = el.nextSibling) {
      if (el.nodeType == 1 && el !== elem) {
        siblings.push(el);
      }
    }
    return siblings;
  }

}
