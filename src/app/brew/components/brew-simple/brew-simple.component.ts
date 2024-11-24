import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrewService } from 'src/app/services/brew.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Tea } from 'src/app/interface/tea.interface';
import { IonProgressBar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-brew-simple',
  templateUrl: './brew-simple.component.html',
  styleUrls: ['./brew-simple.component.scss'],
  standalone: true,
  imports: [IonProgressBar, CommonModule]
})
export class BrewSimpleComponent {

  private _brewService = inject(BrewService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  protected brewList$ = this._brewService.getSimpleBrewList();


  goToTimer(tea: Tea) {
    this._router.navigate([tea.name], { relativeTo: this._route });
    this._brewService.setCurrentTea(tea);
  }

}
