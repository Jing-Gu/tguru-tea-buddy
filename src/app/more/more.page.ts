import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { leafOutline, storefrontOutline, helpCircleOutline, logoFacebook, logoInstagram, logoYoutube } from 'ionicons/icons';
import { Device } from '@capacitor/device';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MorePage implements OnInit {

  os: string | undefined;
  osVersion: string | undefined;
  model: string | undefined;

  constructor() {
    addIcons({leafOutline, storefrontOutline, helpCircleOutline, logoFacebook, logoInstagram, logoYoutube});
  }

  async getDeviceInfo() {
    const info = await Device.getInfo();
      this.os = info.operatingSystem || 'inconnu';
      this.osVersion = info.osVersion || 'inconnu';
      this.model = info.model || 'inconnu';
  }

  ngOnInit() {
    this.getDeviceInfo();
  }

}
