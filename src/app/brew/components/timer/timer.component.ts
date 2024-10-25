import { Component, OnInit, inject } from '@angular/core';
import { BrewService } from 'src/app/services/brew.service'

@Component({
  selector: 'tguru-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
})
export class TimerComponent  implements OnInit {

  constructor() { }
  private _brewService = inject(BrewService);
  tea: any;

  ngOnInit() {
    this.tea = this._brewService.getCurrentTea();
    console.log(this.tea)
  }

}
