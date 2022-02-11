import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CriptomonedaService } from '../services/criptomoneda.service';

@Component({
  selector: 'app-por-criptomoneda',
  templateUrl: './por-criptomoneda.component.html',
  styleUrls: ['./por-criptomoneda.component.css']
})
export class PorCriptomonedaComponent implements OnInit {
  hayError: boolean = false;
  termino: string = "";
  criptomonedas: any[] = [];

  constructor(private criptomonedaService: CriptomonedaService) { }

  buscar() {
    this.hayError = false;
    this.criptomonedaService.buscarCriptomoneda(this.termino)
      .subscribe({
        next: (resp) => {
          console.log("HOLA" + resp);
          this.criptomonedas = resp;
        },
        error: (err) => { this.hayError = true; this.criptomonedas = []; console.log("ERROR" + err); }
      });
  }

  ngOnInit(): void {
  }
}