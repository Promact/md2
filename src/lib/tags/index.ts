import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Md2AutocompleteModule } from '../autocomplete/index';
import { Md2Tags } from './tags';

export * from './tags';

@NgModule({
  imports: [CommonModule, FormsModule, Md2AutocompleteModule],
  exports: [Md2Tags],
  declarations: [Md2Tags],
})
export class Md2TagsModule { }
