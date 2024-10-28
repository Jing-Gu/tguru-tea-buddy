import { Component, OnInit, inject } from '@angular/core';
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
  imports: [RouterLink, IonIcon, IonButton, NgxGaugeModule]
})
export class TimerComponent  implements OnInit {

  brewingTimeDefault: string = '';
  brewingTime: string = '';
  gaugePercent = 0;

  constructor() {
    addIcons({leafOutline, waterOutline, thermometerOutline});
  }
  private _brewService = inject(BrewService);
  tea: any;

  ngOnInit() {
    this.tea = this._brewService.getCurrentTea();
    console.log(this.tea)
    this.checkDefaultBrewTime(this.tea.brewTime)
  }

  checkDefaultBrewTime(brewSecondsDefault: number) {
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
    this.brewingTimeDefault = `${brewMinutes < 1 ? '0' : ''}${brewMinutes}:${brewSeconds < 10 ? '0' : ''}${brewSeconds}`;
    this.brewingTime = this.brewingTimeDefault;
  }

  startTimer() {

  }

}
