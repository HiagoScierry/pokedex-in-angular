import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './Interface/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  api: string = "https://pokeapi.co/api/v2";

  constructor(private http: HttpClient) {
  }

  getPokemon(id: number): Promise<Pokemon> {
    return this.http.get<any>(`${this.api}/pokemon/${id}`).toPromise();
  }

  getTypes() {
    return this.http.get<any>(`${this.api}/type`).toPromise();
  }
}
