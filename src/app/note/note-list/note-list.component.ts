import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonTextarea, 
  IonList, IonFab, IonFabButton, IonIcon, IonItemOptions, IonItemOption, IonItemSliding, IonProgressBar, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, chevronBackOutline, saveOutline, starOutline, star , trash, fileTrayOutline } from 'ionicons/icons';
import { StorageService } from 'src/app/services/storage.service'
import { Note } from 'src/app/interface/note.interface'


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  standalone: true,
  imports: [
    IonItemSliding, IonItemOption, IonItemOptions, IonIcon, IonFabButton, IonFab, IonList, IonLabel, IonTextarea, IonItem, IonContent, IonHeader,
    IonTitle, IonToolbar, IonProgressBar,
    CommonModule, RouterLink, FormsModule, ReactiveFormsModule
  ]
})
export class NoteListComponent implements OnInit {
  //private router = inject(Router);
  //private route = inject(ActivatedRoute);
  private alertController = inject(AlertController);
  private storageService = inject(StorageService);

  protected pinned = false;

  protected notes$ = this.storageService.noteListObs;
  protected sortedNotes: Note[] = [];

  constructor() {
    addIcons({createOutline, chevronBackOutline, starOutline, star,
      saveOutline, trash, fileTrayOutline});
  }

  ngOnInit() {
    this.storageService.getAllNotes();
    this.storageService.noteListObs.subscribe(notes => {
      this.sortedNotes = this.sortItems(notes);
    })
  }

  protected onDeleteNote(uuid: string) {
    this.presentAlert(uuid);
  }

  private sortItems(items: Note[]) {
    return items.sort((a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
      return dateB - dateA;  // Descending order
    });
  }


  private deleteNote(uuid: string) {
    this.storageService.deleteNote(uuid).then(_ => {
      this.storageService.getAllNotes()
    })
  }

  private async presentAlert(uuid: string) {
    const alert = await this.alertController.create({
      message: 'Êtes-vous sûr de vouloir supprimer cette note ? ',
      backdropDismiss: true,
      mode: 'md',
      cssClass: 'alertbox',
      buttons: [{
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'btncancel',
      },
      {
        text: 'Supprimer',
        role: 'confirm',
        cssClass: 'btnconfirm',
        handler: () => {
          this.deleteNote(uuid)
        },
      },],
    })
    await alert.present()
  }


}
