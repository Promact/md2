import {
  Directive,
  EventEmitter,
  Output,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[md2-menu-trigger]',
  host: {
    'aria-haspopup': 'true',
    '(click)': 'toggleMenu()',
  },
  exportAs: 'md2MenuTrigger'
})
export class Md2MenuTrigger {
  private _menuOpen: boolean = false;

  @Output() onMenuOpen = new EventEmitter<void>();
  @Output() onMenuClose = new EventEmitter<void>();

  toggleMenu(): void {
    return this._menuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    console.log('open');
    if (!this._menuOpen) {
      this._setIsMenuOpen(true);
      //  this._createOverlay();
      //  this._overlayRef.attach(this._portal);
      //  this._subscribeToBackdrop();
      //  this._initMenu();
    }
  }

  closeMenu(): void {
    console.log('close');
    this._setIsMenuOpen(false);
    //if (this._overlayRef) {
    //  this._overlayRef.detach();
    //  this._backdropSubscription.unsubscribe();
    //  this._resetMenu();
    //}
  }

  private _setIsMenuOpen(isOpen: boolean): void {
    this._menuOpen = isOpen;
    this._menuOpen ? this.onMenuOpen.emit() : this.onMenuClose.emit();
  }

}
