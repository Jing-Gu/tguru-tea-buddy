import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimerService {

  cancelTimer = new BehaviorSubject<boolean>(true);
  cancelTimer$ = this.cancelTimer.asObservable();

  timerDone = new BehaviorSubject<boolean>(true);
  timerDone$ = this.timerDone.asObservable();

  constructor() { }

}
