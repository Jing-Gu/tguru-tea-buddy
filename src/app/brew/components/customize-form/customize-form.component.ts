import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonItem, IonIcon, IonContent, IonInput } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'tguru-customize-form',
  templateUrl: './customize-form.component.html',
  styleUrls: ['./customize-form.component.scss'],
  standalone: true,
  imports: [IonInput, IonContent, IonIcon, IonItem, IonTitle, IonButton, IonButtons, IonHeader, IonToolbar, ReactiveFormsModule]
})
export class CustomizeFormComponent  implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    addIcons({chevronBackOutline});
  }
  
  protected customTimerForm: FormGroup = this.fb.group({
    minute: ['', [Validators.pattern('^[0-9]*$'), Validators.min(0), Validators.max(10)]],
    second: ['', [Validators.pattern('^[0-9]*$'), Validators.min(0), Validators.max(60)]]
  }) 


  ngOnInit() {}

  get minute() {
    return this.customTimerForm.get("minute");
  }

  get second() {
    return this.customTimerForm.get("second");
  } 

  protected goBack() {
    this.router.navigateByUrl('tabs/brew');
  }

  // only customize tile nav has good animation for forward and back, because the clear route /customize?
  // TODO: instead of route as :name, use static route /timer, then get tea data in the component via contentful

  protected goToTimer() {
    if(this.customTimerForm.valid) {
      console.log(this.customTimerForm.value)
      //this.brewService.setCurrentTea(tea);
      this.router.navigateByUrl('tabs/brew/timer');
    }
  }

}
