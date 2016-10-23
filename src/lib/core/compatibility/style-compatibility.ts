import {NgModule, ModuleWithProviders, Directive, Renderer, ElementRef} from '@angular/core';


/** Selector that matches all elements that may have style collisions with material1. */
export const ELEMENTS_SELECTOR = `
  md2-accordion,
  md2-autocomplete,
  md2-chips,
  md2-collapse,
  md2-colorpicker,
  md2-data-table,
  md2-datepicker,
  md2-dialog,
  md2-menu,
  md2-multiselect,
  md2-select,
  md2-tabs,
  md2-tags,
  md2-toast,
  md2-tooltip
`;

/**
 * Directive to apply to all material2 components that use the same element name as a
 * component in material2. It does two things:
 * 1) Adds the css class "md2" to the host element so that material1 can use this class with a
 *    :not() in order to avoid affecting material2 elements.
 * 2) Adds a css class to the element that is identical to the element's tag. E.g., the element
 *    `<md-card>` would be given a css class `md-card`. This is done so that material2 can style
 *    only these classes instead of defining element rules that would affect material1 components.
 */
@Directive({
  selector: ELEMENTS_SELECTOR,
})
export class StyleCompatibility {
  constructor(renderer: Renderer, elementRef: ElementRef) {
    const element = elementRef.nativeElement as Node;
    renderer.setElementClass(element, 'md2', true);
    renderer.setElementClass(element, element.nodeName.toLowerCase(), true);
  }
}


@NgModule({
  declarations: [StyleCompatibility],
  exports: [StyleCompatibility],
})
export class StyleCompatibilityModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StyleCompatibilityModule,
      providers: [],
    };
  }
}
