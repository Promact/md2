import {global} from '@angular/core/src/facade/lang';

export enum DatepickerTheme {DP3 = 1, DP4 = 2}

export class DatepickerConfig {
  private static _theme:DatepickerTheme;

  public static get theme():DatepickerTheme {
    
    if (global && (global as any).__theme === 'DP4') {
      return DatepickerTheme.DP4;
    }
    return (this._theme || DatepickerTheme.DP3);
  }

  public static set theme(v:DatepickerTheme) {
    this._theme = v;
  }
}