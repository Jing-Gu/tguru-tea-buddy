import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cafeOutline, readerOutline, libraryOutline, ellipsisHorizontalOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, RouterLink, RouterModule],
})
export class TabsPage {
  constructor() {
    addIcons({cafeOutline, readerOutline, libraryOutline, ellipsisHorizontalOutline});
  }
}
