import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'hightlight' })
export class HightlightPipe implements PipeTransform {
  transform(value: string, query: string) {
    if (query.length < 1) { return value; }
    return query ? value.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<span class="highlight">$&</span>') : value;
  }
  private escapeRegexp(queryToEscape: string) {
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }
}