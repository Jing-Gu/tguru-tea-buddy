import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { IonProgressBar } from "@ionic/angular/standalone";
import { BrewService } from 'src/app/services/brew.service'
import { Tea } from 'src/app/interface/tea.interface';

@Component({
  selector: 'app-brew-simple',
  templateUrl: './brew-simple.component.html',
  styleUrls: ['./brew-simple.component.scss'],
  standalone: true,
  imports: [IonProgressBar, CommonModule, RouterLink]
})
export class BrewSimpleComponent {

  private brewService = inject(BrewService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected brewList$ = this.brewService.getSimpleBrewList(); //TODO: get from contentful


  protected goToTimer(tea: Tea) {
    this.brewService.setCurrentTea(tea);
    this.router.navigate([tea.name], { relativeTo: this.route });
  }


}
