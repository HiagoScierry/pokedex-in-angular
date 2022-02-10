import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/Interface/Pokemon';
import { PokemonService } from 'src/app/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  poke?: Pokemon;

  constructor(private pokemonService: PokemonService,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getPokemon();
  }

  async getPokemon() {
    const id = this.activeRoute.snapshot.params['id'];
    const response = await this.pokemonService.getPokemon(id)

    this.poke = {
      id: response.id,
      name: response.name,
      types: response.types.map((index: any) => index.type.name),
      stats: response.stats
    }
  }

}
