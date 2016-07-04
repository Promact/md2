import { Component, OnInit } from '@angular/core';
import { Md2Datepicker } from '../../../components/datepicker/datepicker';

@Component({
  selector: 'datepicker',
  templateUrl: './app/components/datepicker/datepicker.html',
  directives: [Md2Datepicker]
})
export class Datepicker { 
	
  public dt:Date = new Date();
  public minDate:Date;
  public maxDate:Date;

  public constructor() {
	  (this.minDate = new Date()).setDate(this.minDate.getDate() - 8);
	  (this.maxDate = new Date()).setDate(this.maxDate.getDate() + 8);
  }

  public getDate():number {
   	return this.dt && this.dt.getTime() || new Date().getTime();
  }

}