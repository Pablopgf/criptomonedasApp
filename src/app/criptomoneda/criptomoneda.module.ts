import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerCriptomonedaComponent } from './ver-criptomoneda/ver-criptomoneda.component';
import { PorCriptomonedaComponent } from './por-criptomoneda/por-criptomoneda.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PorRankingComponent } from './por-ranking/por-ranking.component';



@NgModule({
  declarations: [
    VerCriptomonedaComponent,
    PorCriptomonedaComponent,
    PorRankingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule

  ],
  exports: [
    PorCriptomonedaComponent,
    VerCriptomonedaComponent
  ]
})
export class CriptomonedaModule { }
