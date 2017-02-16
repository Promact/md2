import { animate, state, style, transition, trigger } from '@angular/core';
/**
 * This animation zooms in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 */
export var zoomInContent = trigger('zoomInContent', [
    state('in', style({ opacity: 1 })),
    transition('void => in', [
        style({ opacity: 0, transform: "scale3d(.3, .3, .3)" }),
        animate("400ms cubic-bezier(0.25, 0.8, 0.25, 1)")
    ])
]);
//# sourceMappingURL=dialog-animations.js.map