import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonIcon, IonButton, } from '@ionic/angular/standalone';
import { leafOutline, waterOutline, thermometerOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons'
import { NgxGaugeModule } from 'ngx-gauge';
import { BrewService } from 'src/app/services/brew.service'

@Component({
  selector: 'tguru-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonIcon, IonButton, NgxGaugeModule]
})
export class TimerComponent  implements OnInit {
  private _brewService = inject(BrewService);
  protected tea: any;
  protected brewingTime: string = '';
  protected gaugePercent = 0;
  protected timerIsOff = true;

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

  protected startTimer() {
    this.timerIsOff = false;
  }

  protected resetTimer() {
    this.timerIsOff = true;
  }

}
