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
  currentPokemonFromGroup: string;

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

  pokemonGroups = [
    {
      name: 'Grass',
      pokemon: [
        { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
        { value: 'oddish-1', viewValue: 'Oddish' },
        { value: 'bellsprout-2', viewValue: 'Bellsprout' }
      ]
    },
    {
      name: 'Water',
      pokemon: [
        { value: 'squirtle-3', viewValue: 'Squirtle' },
        { value: 'psyduck-4', viewValue: 'Psyduck' },
        { value: 'horsea-5', viewValue: 'Horsea' }
      ]
    },
    {
      name: 'Fire',
      disabled: true,
      pokemon: [
        { value: 'charmander-6', viewValue: 'Charmander' },
        { value: 'vulpix-7', viewValue: 'Vulpix' },
        { value: 'flareon-8', viewValue: 'Flareon' }
      ]
    },
    {
      name: 'Psychic',
      pokemon: [
        { value: 'mew-9', viewValue: 'Mew' },
        { value: 'mewtwo-10', viewValue: 'Mewtwo' },
      ]
    }
  ];

  setPokemonValue() {
    this.currentPokemon = ['eevee-4', 'psyduck-6'];
  }
}
