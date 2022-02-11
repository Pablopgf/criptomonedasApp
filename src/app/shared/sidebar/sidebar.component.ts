import { Component, OnInit } from '@angular/core';
import { CriptomonedaService } from 'src/app/criptomoneda/services/criptomoneda.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  get historial() {
    return this.criptomonedaService.historial;
  }

  constructor(private criptomonedaService: CriptomonedaService) { }

  buscar(termino: string) {
    this.criptomonedaService.buscarCriptomoneda(termino.toLocaleUpperCase());
  }

  ngOnInit(): void {
  }
}
