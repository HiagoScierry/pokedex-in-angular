import { Component, OnInit, Input } from '@angular/core';

import { Pokemon } from 'src/app/Interface/Pokemon';
import { PokemonService } from 'src/app/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  pokemons: Pokemon[] = []
  types: string[] = []
  @Input() search?: string;
  @Input() selectedType?: string;



  constructor(private pokemonService: PokemonService) {

  }

  async ngOnInit() {
    this.getTypes();
    this.pokemons = await this.getPokemons();
  }

  async getTypes() {
    const types = await this.pokemonService.getTypes();

    this.types = ['all', ...types.results.map((index: { name: string; }) => index.name)]
  }

  async getPokemons(): Promise<Pokemon[]> {
    let poke: Pokemon[] = [];

    for (let i = 1; i <= 151; i++) {
      const element = i;
      const response = await this.pokemonService.getPokemon(element)

      const types = response.types.map((index: any) => index.type.name)

      const data: any = {
        id: response.id,
        name: response.name,
        types
      }

      poke.push(data)

    }
    return poke;

  }

  async filterType() {
    this.search = '';

    if (this.selectedType === 'all') {
      this.pokemons = await this.getPokemons();
      return
    }
    const pokemon = await this.getPokemons()
    this.pokemons = pokemon.filter((index: any) => index.types.includes(this.selectedType))
  }

  async filterName() {
    this.selectedType = 'all';
    const pokemon = await this.getPokemons()
    this.pokemons = pokemon.filter((index: any): boolean => {
      const match = index.name.match(this.search);
      if (match !== null) return true
      return false;
    });
  }

}
