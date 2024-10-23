import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BrewService {

  private _http = inject(HttpClient);


  getSimpleBrewList(): Observable<any[]> {
    return this._http.get<any[]>('../../assets/data/tea-brewer.json');
  }
}
