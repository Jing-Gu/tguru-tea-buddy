import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxGaugeModule } from 'ngx-gauge';

import { BrewPageRoutingModule } from './brew-routing.module';

import { BrewPage } from './brew.page';
import { BrewmasterComponent } from './components/brewmaster/brewmaster.component';
import { BrewsimpleComponent } from './components/brewsimple/brewsimple.component';
import { TimerComponent } from './components/timer/timer.component';
import { TimercountdownComponent } from './components/timercountdown/timercountdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxGaugeModule,
    BrewPageRoutingModule
  ],
  declarations: [BrewPage, BrewmasterComponent, BrewsimpleComponent, TimerComponent, TimercountdownComponent]
})
export class BrewPageModule {}
