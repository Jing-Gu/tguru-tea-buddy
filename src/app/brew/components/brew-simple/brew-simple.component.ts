import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrewService } from 'src/app/services/brew.service'

@Component({
  selector: 'tguru-brew-simple',
  templateUrl: './brew-simple.component.html',
  styleUrls: ['./brew-simple.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BrewSimpleComponent  implements OnInit {

  constructor() { }

  private _brewService = inject(BrewService);

  protected brewList$ = this._brewService.getSimpleBrewList();

  ngOnInit() {
    this._brewService.getSimpleBrewList().subscribe(s => console.log('li', s))
  }

  goToTimer(tea: any) {
    //this.timerService.cancelTimer.next(false);
    //this.currentTea = tea;
  }

}
