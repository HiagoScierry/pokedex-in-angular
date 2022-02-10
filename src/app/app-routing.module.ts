import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';

const routes: Routes = [{
  path: "",
  component: PokemonsComponent
},
{
  path: 'details/:id',
  component: PokemonDetailComponent
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
