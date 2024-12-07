import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs'
import { Tea } from '../interface/tea.interface';

@Injectable({
  providedIn: 'root'
})
export class BrewService {

  private http = inject(HttpClient);
  private DATA_SIMPLE_BREWER_LIST = "assets/data/simple-brewer-list.json";
  private DATA_SIMPLE_TIMER = "assets/data/simple-brewers/";
  private cusTea: Tea | undefined;

  setCustomzieTea(tea: Tea) {
    this.cusTea = tea;
  }

  getCustomzieTea() {
    return this.cusTea;
  }


  public getSimpleBrewList(): Observable<Tea[]> {
    return this.http.get<Tea[]>(this.DATA_SIMPLE_BREWER_LIST);
  }

  public getSimpleTimer(tea: string): Observable<Tea> {
    return this.http.get<Tea>(`${this.DATA_SIMPLE_TIMER}${tea}.json`);
  }
}
