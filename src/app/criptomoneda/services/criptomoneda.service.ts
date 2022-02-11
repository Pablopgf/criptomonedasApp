import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Criptomoneda } from '../interface/criptomoneda.interface';


@Injectable({
  providedIn: 'root'
})
export class CriptomonedaService {
  private apiUrl: string = 'https://api.nomics.com/v1/currencies/ticker';
  private apiKey: string = '398f90c97ccdbc7eff2212e7f000c17ce2537676';
  private _historial: string[] = [];

  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    }
  }

  buscarCriptomoneda(termino: string): Observable<Criptomoneda[]> {
    termino = termino.trim().toLocaleUpperCase();
    let terminos = termino.replace(" ", "").split(",");

    terminos.forEach(termino => {
      if (!this._historial.includes(termino)) {
        this._historial.unshift(termino);
        this._historial = this._historial.splice(0, 5);
        localStorage.setItem('historial', JSON.stringify(this._historial));
      }
    });

    const url = `${this.apiUrl}?key=${this.apiKey}&ids=${termino}`;
    return this.http.get<Criptomoneda[]>(url);
  }

  buscarCriptomonedaPorRanking(): Observable<Criptomoneda[]> {
    const url = `${this.apiUrl}?key=${this.apiKey}&sort=rank&per-page=10&status=active`;
    return this.http.get<Criptomoneda[]>(url);
  }

  getCriptomonendaPorID(id: string): Observable<Criptomoneda> {
    const url = `${this.apiUrl}?key=${this.apiKey}&ids=${id.toLocaleUpperCase()}`;
    return this.http.get<Criptomoneda>(url);
  }

  get historial() {
    return this._historial;
  }
}
