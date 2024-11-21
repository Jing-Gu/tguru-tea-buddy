import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonIcon, IonButton, IonAlert } from '@ionic/angular/standalone';
import { leafOutline, waterOutline, thermometerOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons'
import { BrewService } from 'src/app/services/brew.service'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [IonAlert, CommonModule, RouterLink, IonIcon, IonButton]
})
export class TimerComponent  implements OnInit {
  private _brewService = inject(BrewService);
  private _router = inject(Router);

  // to store the identifier returned by the setInterval function.
  // This identifier is necessary to clear the interval later using clearInterval
  // This allows you to stop the timer when the countdown reaches zero or when you need to reset the timer.
  private _interval: any;

  protected tea: any;
  protected brewingTime: string = '';
  protected gaugePercent = 0;
  protected timerIsOff = true;

  protected isAlertOpen = false;
  protected isAnimating: boolean = false;

  constructor() {
    addIcons({leafOutline, waterOutline, thermometerOutline});
  }

  ngOnInit() {
    this.tea = this._brewService.getCurrentTea();
    console.log(this.tea)
    this.checkDefaultBrewTime(this.tea.brewTime)
  }

  private checkDefaultBrewTime(brewSecondsDefault: number) {
    let brewMinutes;
    let brewSeconds;
    if (brewSecondsDefault < 60) {
      brewMinutes = 0;
      brewSeconds = brewSecondsDefault;
    } else {
      brewMinutes = Math.floor(brewSecondsDefault/60);
      brewSeconds = brewSecondsDefault % 60;
    }
    // eslint-disable-next-line max-len
    this.brewingTime = `${brewMinutes < 1 ? '0' : ''}${brewMinutes}:${brewSeconds < 10 ? '0' : ''}${brewSeconds}`;
  }

  private displayTimeLeft(remainingSeconds: number) {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    this.brewingTime = `${minutes < 1 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  protected startTimer() {
    this.timerIsOff = false;
    this.isAnimating = true;
    let timer = this.tea.brewTime * 1000;
    this._interval = setInterval(() => {
      timer -= 1000;
      const remainingSeconds = Math.max(0, timer / 1000);
      this.gaugePercent = 100 - Math.floor(timer / (this.tea.brewTime * 1000) * 100);

      this.displayTimeLeft(remainingSeconds);

      if (timer <= 0) {
        this.gaugePercent = 100;
        clearInterval(this._interval);
        this.isAlertOpen = true;
        this.isAnimating = false;
        this._playCompletionSound();
      }
      console.log('left', remainingSeconds, '%', this.gaugePercent);
    }, 1000);
  }

  protected resetTimer() {
    this.timerIsOff = true;
    this.isAnimating = false;
    this.gaugePercent = 0;
    clearInterval(this._interval);
    this.checkDefaultBrewTime(this.tea.brewTime);
  }

  protected cancelTimer() {
    this.resetTimer();
    this._router.navigate(['../']);
  }

  protected setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  private _playCompletionSound() {
    // const audio = new Audio('assets/sound/completion-sound.mp3');
    // audio.play();
  }

}
