import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs'
import { Tea } from '../interface/tea.interface';

@Injectable({
  providedIn: 'root'
})
export class BrewService {

  private _http = inject(HttpClient);
  private _tea: Tea | undefined;

  setCurrentTea(tea: Tea) {
    this._tea = tea;
  }

  getCurrentTea() {
    return this._tea;
  }


  getSimpleBrewList(): Observable<Tea[]> {
    return this._http.get<Tea[]>('../../assets/data/tea-brewer.json');
  }
}
