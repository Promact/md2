import {
  animate,
  AnimationEntryMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/core';

/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 */
export const fadeInContent: AnimationEntryMetadata = trigger('fadeInContent', [
  state('showing', style({ opacity: 1 })),
  transition('void => showing', [
    style({ opacity: 0 }),
    animate(`150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
  ])
]);
