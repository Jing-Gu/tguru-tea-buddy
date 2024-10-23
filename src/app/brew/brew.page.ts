import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BrewSimpleComponent } from './components/brew-simple/brew-simple.component';

@Component({
  selector: 'tguru-brew',
  templateUrl: './brew.page.html',
  styleUrls: ['./brew.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, BrewSimpleComponent]
})
export class BrewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
