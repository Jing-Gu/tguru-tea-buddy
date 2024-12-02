import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IonProgressBar, IonAlert, IonModal, ModalController, AlertController, IonToolbar, IonHeader, IonButtons, IonButton, IonTitle, IonItem, IonContent, IonInput, IonIcon } from "@ionic/angular/standalone";
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

  private brewService = inject(BrewService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private modalController = inject(ModalController)
  private alertController = inject(AlertController);

  protected brewList$ = this.brewService.getSimpleBrewList(); //TODO: get from contentful
  protected isModalOpen = false;
/*   protected customTimerForm: FormGroup = this._fb.group({
    minute: ['', [Validators.pattern('^[0-9]*$'), Validators.min(0), Validators.max(10)]],
    second: ['', [Validators.pattern('^[0-9]*$'), Validators.min(0), Validators.max(60)]]
  }) */

  private minute: number = 0;
  private second: number = 0;

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Minuterie Manuelle',
      backdropDismiss: true,
      inputs: [
        {
          name: 'minute',
          type: 'number',
          label: 'Minute',
          value: this.minute.toString(),
          min: 0,
          max: 10
        },
        {
          name: 'second',
          type: 'number',
          label: 'Seconde',
          value: this.second.toString(),
          min: 0,
          max: 60
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'OK',
          cssClass: this.isFormValid() ? 'btndisabled' : '',
          handler: (data) => {
            this.minute = data.minute;
            this.second = data.second;
            console.log(this.minute, this.second)
            this.setTimer();
          },
          //disabled: !this.isFormValid() // Disable until the form is valid
        }
      ]
    });

    await alert.present();
  }

  private isFormValid() {
    return this.minute >= 0 && this.minute <= 10 && this.second >= 0 && this.second <= 60;
  }



/*   get minute() {
    return this.customTimerForm.get("minute");
  }

  get second() {
    return this.customTimerForm.get("second");
  } */

  protected goToTimer(tea: Tea) {
    this.router.navigate([tea.name], { relativeTo: this.route });
    this.brewService.setCurrentTea(tea);
  }

  protected setTimer() {
    const cusBrewTime = this.minute * 60 + this.second;
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
    this.modalController.dismiss().then(_ => {
      this.goToTimer(cusTea);
      this.closeModal();
    })

  }

  protected openModal() {
    this.isModalOpen = true;
  }

  protected closeModal() {
    this.isModalOpen = false;
    //this.customTimerForm.reset();
  }

}
