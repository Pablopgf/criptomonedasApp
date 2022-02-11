import { Component, OnInit } from '@angular/core';
import { CriptomonedaService } from '../services/criptomoneda.service';

@Component({
  selector: 'app-por-ranking',
  templateUrl: './por-ranking.component.html',
  styleUrls: ['./por-ranking.component.css']
})
export class PorRankingComponent implements OnInit {
  hayError: boolean = false;
  criptomonedas: any[] = [];

  constructor(private criptomonedaService: CriptomonedaService) { }

  ngOnInit(): void {
    this.hayError = false;
    this.criptomonedaService.buscarCriptomonedaPorRanking()
      .subscribe({
        next: (resp) => {
          console.log("HOLA" + resp);
          this.criptomonedas = resp;
        },
        error: (err) => { this.hayError = true; this.criptomonedas = []; console.log("ERROR" + err); }
      });
  }
}
