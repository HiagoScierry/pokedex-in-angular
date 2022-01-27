import { Component, OnInit } from '@angular/core';

import { Pokemon } from 'src/app/Interface/Pokemon';
import { PokemonService } from 'src/app/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: any[] = []

  constructor(private pokemonService: PokemonService) {

  }

  async ngOnInit() {
    this.pokemons = await this.getPokemons();
    // this.filterType('grass')
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

  async filterType(type: string) {
    const pokemon = await this.getPokemons()
    this.pokemons = pokemon.filter((index: any) => index.types.includes(type))
  }

}
