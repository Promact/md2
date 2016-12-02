import {
  Directive,
  ElementRef,
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

  constructor(private _element: ElementRef) { }

  ngOnDestroy() {
    this._closeMenu();
  }

  private close = (event: any) => {
    if (event.target !== this._getHostElement() && !this._getParentElement().contains(event.target)) {
      this._closeMenu();
    }
  };


  _toggleMenu() {
    if (this._hasClass(this._getParentElement(), 'open')) {
      this._closeMenu();
    } else {
      this._openMenu();
    }
  }

  _openMenu() {
    this._getParentElement().classList.add('open');
    document.addEventListener('click', this.close, true);
    let siblingElements = this._getSiblingElements(this._getParentElement());
    siblingElements.forEach((el: Element) => {
      el.classList.remove('open');
      this._closeChildrenMenu(el);
    });
  }

  _closeMenu() {
    console.log('ttt');
    document.removeEventListener('click', this.close);
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

  _hasClass(element: Element, className: string) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }
}
