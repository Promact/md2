import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  /**
   * Transform function
   * @param value string
   * @param query string filter value
   * @return filtered string with markup
   */
  transform(value: string, query: string) {
    if (query.length < 1) { return value; }
    return query ? value.replace(new RegExp(this._escapeRegexp(query), 'gi'),
      '<span class="highlight">$&</span>') : value;
  }

  /**
   * filter pipe
   * @param queryToEscape
   * @return queryToEscape with replace string
   */
  private _escapeRegexp(queryToEscape: string) {
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }
}
