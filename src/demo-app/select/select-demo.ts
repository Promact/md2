import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'select-demo',
  templateUrl: '../select/select-demo.html',
  styleUrls: ['../select/select-demo.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectDemo {
  isRequired = false;
  isDisabled = false;
  _search: string = '';
  item: any = null;
  pokemonRequired = false;
  pokemonDisabled = false;
  currentPokemon: string[];

  items: Array<any> =
  [
    { name: 'Vadodara', value: '1' },
    { name: 'Rajkot', value: '2' },
    { name: 'Delhi', value: '3' },
    { name: 'Chennai', value: '4' },
    { name: 'Mumbai', value: '5' },
    { name: 'Goa', value: '6' }
  ];

  pokemon = [
    { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
    { value: 'charizard-1', viewValue: 'Charizard' },
    { value: 'squirtle-2', viewValue: 'Squirtle' },
    { value: 'pikachu-3', viewValue: 'Pikachu' },
    { value: 'eevee-4', viewValue: 'Eevee' },
    { value: 'ditto-5', viewValue: 'Ditto' },
    { value: 'psyduck-6', viewValue: 'Psyduck' },
  ];

  setPokemonValue() {
    this.currentPokemon = ['eevee-4', 'psyduck-6'];
  }
}
