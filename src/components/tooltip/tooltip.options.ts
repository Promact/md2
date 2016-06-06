import {Injectable} from '@angular/core';

@Injectable()
export class Md2TooltipOptions {
  public direction: string;

  public constructor(options: Object) {
    Object.assign(this, options);
  }
}
