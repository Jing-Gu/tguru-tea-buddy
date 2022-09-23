import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimerService } from '../../../services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {

  @Input() currentTea;
  timerIsOff = true;
  customizedTimeInSeconds: number;

  constructor(private timerService: TimerService) {}

  startTimer() {
    this.timerIsOff = false;
  }

  resetTimer() {
    this.timerIsOff = true;
  }

  cancelTimer() {
    this.timerService.cancelTimer.next(true);
  }

  setCustomTimer(timerForm: NgForm) {
    this.timerIsOff = false;
    this.customizedTimeInSeconds = timerForm.value.minutes * 60 + timerForm.value.seconds;
  }

  resetCustomTimer(timerForm: NgForm) {
    this.timerIsOff = true;
    timerForm.resetForm();
  }

  setTimerDone() {
    this.timerIsOff = true;
  }

}

