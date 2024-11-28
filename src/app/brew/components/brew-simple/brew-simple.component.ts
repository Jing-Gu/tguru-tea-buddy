import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IonProgressBar, IonAlert, IonModal, ModalController, IonToolbar, IonHeader, IonButtons, IonButton, IonTitle, IonItem, IonContent, IonInput, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { BrewService } from 'src/app/services/brew.service'
import { Tea } from 'src/app/interface/tea.interface';

@Component({
  selector: 'app-brew-simple',
  templateUrl: './brew-simple.component.html',
  styleUrls: ['./brew-simple.component.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonContent, IonItem, IonTitle, IonButton, IonButtons, IonHeader, IonToolbar, IonModal, IonAlert, IonProgressBar, CommonModule, ReactiveFormsModule]
})
export class BrewSimpleComponent {

  constructor() {
    addIcons({chevronBackOutline});
  }

  private _brewService = inject(BrewService);
  private _router = inject(Router);
  private _fb = inject(FormBuilder);
  private _route = inject(ActivatedRoute);
  private _modalController = inject(ModalController)

  protected brewList$ = this._brewService.getSimpleBrewList();
  protected isModalOpen = false;
  protected customTimerForm: FormGroup = this._fb.group({
    minute: ['', [Validators.pattern('^[0-9]*$'), Validators.min(0), Validators.max(10)]],
    second: ['', [Validators.pattern('^[0-9]*$'), Validators.min(0), Validators.max(60)]]
  })


  get minute() {
    return this.customTimerForm.get("minute");
  }

  get second() {
    return this.customTimerForm.get("second");
  }

  protected goToTimer(tea: Tea) {
    this._router.navigate([tea.name], { relativeTo: this._route });
    this._brewService.setCurrentTea(tea);
  }

  protected setTimer() {
    const cusBrewTime = this.customTimerForm.value.minute * 60 + this.customTimerForm.value.second;
    const cusTea = {
      id: 8,
      name: "customize",
      label: "Minuterie Manuelle",
      teaAmount: 0,
      waterAmount: 0,
      temperature: 0,
      brewTime: cusBrewTime,
      icon: "customize.svg",
      contentfulTag: ""
    }
    this._modalController.dismiss().then(_ => {
      this.goToTimer(cusTea);
      this.closeModal();
    })

  }

  protected openModal() {
    this.isModalOpen = true;
  }

  protected closeModal() {
    this.isModalOpen = false;
    this.customTimerForm.reset();
  }

}
