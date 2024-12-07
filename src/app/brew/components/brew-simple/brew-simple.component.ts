import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'
import { IonProgressBar } from "@ionic/angular/standalone";
import { BrewService } from 'src/app/services/brew.service'

@Component({
  selector: 'app-brew-simple',
  templateUrl: './brew-simple.component.html',
  styleUrls: ['./brew-simple.component.scss'],
  standalone: true,
  imports: [IonProgressBar, CommonModule, RouterLink]
})
export class BrewSimpleComponent {

  private brewService = inject(BrewService);

  protected brewList$ = this.brewService.getSimpleBrewList();

}
