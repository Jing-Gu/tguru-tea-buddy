import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-brew',
  templateUrl: './brew.page.html',
  styleUrls: ['./brew.page.scss'],
})
export class BrewPage implements OnInit {

  currentTab = 'standard';
  hideHeader = false;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.timerService.cancelTimer$.subscribe(c => {
      this.hideHeader = !c;
    });
  }

  selectTimer(tab) {
    this.currentTab = tab;
  }

}
