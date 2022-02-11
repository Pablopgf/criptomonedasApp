import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PorCriptomonedaComponent } from './criptomoneda/por-criptomoneda/por-criptomoneda.component';
import { VerCriptomonedaComponent } from './criptomoneda/ver-criptomoneda/ver-criptomoneda.component';
import { PorRankingComponent } from './criptomoneda/por-ranking/por-ranking.component';

const routes: Routes = [
  {
    path: '',
    component: PorCriptomonedaComponent,
    pathMatch: 'full'
  },
  {
    path: 'ranking',
    component: PorRankingComponent
  },
  {
    path: 'criptomoneda/:id',
    component: VerCriptomonedaComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
