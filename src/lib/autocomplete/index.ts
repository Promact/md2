import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './autocomplete-pipe';
import { Md2Autocomplete } from './autocomplete';

export * from './autocomplete';
export * from './autocomplete-pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [Md2Autocomplete, HighlightPipe],
  declarations: [Md2Autocomplete, HighlightPipe],
})
export class Md2AutocompleteModule { }
