import {
  Directive,
  ElementRef,
  Renderer,
} from '@angular/core';

@Directive({
  selector: '[md2-menu-trigger]',
  host: {
    'aria-haspopup': 'true',
    '(click)': '_toggleMenu()',
  },
  exportAs: 'md2MenuTrigger'
})
export class Md2MenuTrigger {

  private _handleClick: any;

  constructor(private _element: ElementRef, private _renderer: Renderer) { }

  ngAfterViewInit() {
    this._handleClick = this._renderer.listenGlobal('document', 'click', (event: Event) => {
      if (!this._hasChildMenu(event)) {
        this._closeMenu();
      }
    });
  }

  ngOnDestroy() {
    this._handleClick = null;
  }

  _toggleMenu() {
    if (this._hasClass(this._getParentElement(), 'open')) {
      this._closeMenu();
    } else {
      this._openMenu();
    }
  }

  _openMenu() {
    this._getParentElement().classList.add('open');
    let siblingElements = this._getSiblingElements(this._getParentElement());
    siblingElements.forEach((el: Element) => {
      el.classList.remove('open');
      this._closeChildrenMenu(el);
    });
  }

  _closeMenu() {
    this._getParentElement().classList.remove('open');
    this._closeChildrenMenu(this._getParentElement());
  }

  _closeChildrenMenu(element: Element) {
    [].forEach.call(element.querySelectorAll('.open'), (el: Element) => {
      el.classList.remove('open');
    });
  }

  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  _getParentElement(): HTMLElement {
    return this._element.nativeElement.parentNode;
  }

  _getSiblingElements(element: Element) {
    let siblingElements: Array<Node> = [];
    let el = element.parentNode.firstChild;
    for (; el; el = el.nextSibling) {
      if (el.nodeType == 1 && el !== element) {
        siblingElements.push(el);
      }
    }
    return siblingElements;
  }

  _getClosestElement(element: Element, target: string): Element {
    if (element.hasAttribute(target)) {
      return element;
    }

    let parentEl: Element;
    while (element) {
      parentEl = element.parentElement;
      if (parentEl && parentEl.hasAttribute(target)) {
        return parentEl;
      }
      element = parentEl;
    }
    return null;
  }

  _hasClass(element: Element, className: string) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }

  _hasChildMenu(event: any) {
    let el = this._getClosestElement(event.target, 'md2-menu-trigger');
    if (el && el === this._getHostElement()) {
      return true;
    } else if (this._getParentElement().contains(event.target)) {
      el = this._getClosestElement(event.target, 'md2-menu-item');
      if (el && el.querySelectorAll('[md2-menu-content]').length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
