import { Component, OnInit } from '@angular/core';
import * as teaBrewData from '../../../../data/teaBrewData.json';
import { TimerService } from '../../../services/timer.service';

@Component({
  selector: 'app-brewsimple',
  templateUrl: './brewsimple.component.html',
  styleUrls: ['./brewsimple.component.scss'],
})
export class BrewsimpleComponent implements OnInit {

  allTeas = Array.from(teaBrewData);
  showAllTeas = true;
  currentTea;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.timerService.cancelTimer$.subscribe(c => {
      this.showAllTeas = c;
    });
  }

  goToTimer(tea) {
    this.timerService.cancelTimer.next(false);
    this.currentTea = tea;
  }

}
