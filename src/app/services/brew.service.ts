import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BrewService {

  private _http = inject(HttpClient);
  private _tea: any;

  setCurrentTea(tea: any) {
    this._tea = tea;
  }

  getCurrentTea() {
    return this._tea;
  }


  getSimpleBrewList(): Observable<any[]> {
    return this._http.get<any[]>('../../assets/data/tea-brewer.json');
  }
}
