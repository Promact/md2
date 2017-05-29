import {Component, ViewEncapsulation, ContentChildren, QueryList, Input} from '@angular/core';
import {mixinDisabled, CanDisable} from '../core/common-behaviors/disabled';

// Boilerplate for applying mixins to Md2Optgroup.
export class Md2OptgroupBase { }
export const _Md2OptgroupMixinBase = mixinDisabled(Md2OptgroupBase);

// Counter for unique group ids.
let nextId = 0;

/**
 * Component that is used to group instances of `md2-option`.
 */
@Component({
  moduleId: module.id,
  selector: 'md2-optgroup',
  templateUrl: 'optgroup.html',
  styleUrls: ['optgroup.css'],
  encapsulation: ViewEncapsulation.None,
  inputs: ['disabled'],
  host: {
    'class': 'md2-optgroup',
    'role': 'group',
    '[class.md2-optgroup-disabled]': 'disabled',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-labelledby]': '_labelId',
  }
})
export class Md2Optgroup extends _Md2OptgroupMixinBase implements CanDisable {
  /** Label for the option group. */
  @Input() label: string;

  /** Unique id for the underlying label. */
  _labelId: string = `md2-optgroup-label-${nextId++}`;
}
