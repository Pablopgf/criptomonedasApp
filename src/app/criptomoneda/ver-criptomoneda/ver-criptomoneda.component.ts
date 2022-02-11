import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Criptomoneda } from '../interface/criptomoneda.interface';
import { CriptomonedaService } from '../services/criptomoneda.service';

@Component({
  selector: 'app-ver-criptomoneda',
  templateUrl: './ver-criptomoneda.component.html',
  styleUrls: ['./ver-criptomoneda.component.css']
})
export class VerCriptomonedaComponent implements OnInit {
  criptomoneda!: Criptomoneda;

  constructor(
    private activatedRoute: ActivatedRoute,
    private criptomonedaService: CriptomonedaService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.criptomonedaService.getCriptomonendaPorID(id
        )),
        tap(console.log)
      )
      .subscribe(criptomoneda => {
        this.criptomoneda = criptomoneda[0];
        console.log("Mi criptomoneda", this.criptomoneda)
      });
  }
}
