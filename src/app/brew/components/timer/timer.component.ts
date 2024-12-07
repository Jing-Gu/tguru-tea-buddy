import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonIcon, IonButton, IonAlert } from '@ionic/angular/standalone';
import { leafOutline, waterOutline, thermometerOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons'
import { BrewService } from 'src/app/services/brew.service'
import { Tea } from 'src/app/interface/tea.interface';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [IonAlert, CommonModule, IonIcon, IonButton]
})
export class TimerComponent  implements OnInit {
  private brewService = inject(BrewService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private audio: HTMLAudioElement | undefined;

  // to store the identifier returned by the setInterval function.
  // This identifier is necessary to clear the interval later using clearInterval
  // This allows you to stop the timer when the countdown reaches zero or when you need to reset the timer.
  private interval: any;

  protected tea: Tea | undefined;
  protected brewingTime: string = '';
  protected isTimerOff = true;
  protected isAlertOpen = false;
  protected isAnimating = false;

  protected alertButtons = [
    {
      text: 'Ok',
      role: 'cancel',
      handler: () => {
        this.resetTimer();
      },
    },
  ];

  constructor() {
    addIcons({leafOutline, waterOutline, thermometerOutline});
  }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get("name");
    if (name && name !== "cus-tea") {
      this.brewService.getSimpleTimer(name).subscribe(tea => {
        this.tea = tea;
        this.brewingTime = this.formatTime(this.tea.brewTime.minute, this.tea.brewTime.second);
      });
    } else if (name === "cus-tea") {
      this.tea = this.brewService.getCustomzieTea();
      if (this.tea) {
        this.brewingTime = this.formatTime(this.tea.brewTime.minute, this.tea.brewTime.second);
      }
    }
  }

  protected startTimer() {
    this.isTimerOff = false;
    this.isAnimating = true;
    if (this.tea) {
      let timer = (Number(this.tea.brewTime.minute) * 60) + Number(this.tea.brewTime.second);
      this.interval = setInterval(() => {
        timer -= 1;
        const remainingSeconds = Math.max(0, timer);
        this.displayTimeLeft(remainingSeconds);
        if (timer <= 0) {
          clearInterval(this.interval);
          this.isAlertOpen = true;
          this.isAnimating = false;
          this.playCompletionSound();
        }
      }, 1000);
    }
  }

  protected resetTimer() {
    this.isTimerOff = true;
    this.isAnimating = false;
    clearInterval(this.interval);
    if (this.tea) {
      this.brewingTime = this.formatTime(this.tea.brewTime.minute, this.tea.brewTime.second);
    }
  }

  protected cancelTimer() {
    this.resetTimer();
    this.router.navigate(['../']);
  }

  protected closeAlert(isOpen: boolean) {
    this.isAlertOpen = isOpen;
    this.stopCompletionSound();
  }

  private playCompletionSound() {
    this.audio = new Audio('assets/completion-sound.mp3');
    this.audio.play();
  }

  private stopCompletionSound() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  private formatTime(min: number, sec: number) {
    const minute = min < 10 ? `0${min}` : min;
    const second = sec < 10 ? `0${sec}` : sec;
    return `${minute} : ${second}`;
  }

  private displayTimeLeft(remainingSeconds: number) {
    const minute = Math.floor(remainingSeconds / 60);
    const second = remainingSeconds % 60;
    this.brewingTime = this.formatTime(minute, second);
  }

}
