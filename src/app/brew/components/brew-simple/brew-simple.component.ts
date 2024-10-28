import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrewService } from 'src/app/services/brew.service'
import { ActivatedRoute, Router } from '@angular/router'

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
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  protected brewList$ = this._brewService.getSimpleBrewList();

  ngOnInit() {
    this._brewService.getSimpleBrewList().subscribe(s => console.log('li', s))
  }

  goToTimer(tea: any) {
    this._router.navigate([tea.name], { relativeTo: this._route });
    this._brewService.setCurrentTea(tea);
  }

}
