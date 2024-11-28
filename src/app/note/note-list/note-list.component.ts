import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormsModule, FormBuilder } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonTextarea, IonList, IonFab, IonFabButton, IonIcon,
  IonModal, IonButtons, IonButton, IonItemOptions, IonItemOption, IonItemSliding, IonProgressBar, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, chevronBackOutline, saveOutline, starOutline, star , trash, fileTrayOutline } from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from 'src/app/services/storage.service'
import { Note } from 'src/app/interface/note.interface'


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  standalone: true,
  imports: [
    IonItemSliding, IonItemOption, IonItemOptions, IonButtons, IonButton,
    IonModal, IonIcon, IonFabButton, IonFab, IonList, IonLabel, IonTextarea, IonItem, IonContent, IonHeader,
    IonTitle, IonToolbar, IonProgressBar,
    CommonModule, RouterLink, FormsModule, ReactiveFormsModule
  ]
})
export class NoteListComponent  implements OnInit {
  private fb = inject(FormBuilder);
  private alertController = inject(AlertController);
  private storageService = inject(StorageService);

  protected isModalOpen = false;
  protected pinned = false;
  protected noteForm: FormGroup = this.fb.group({
    uuid: [uuidv4()],
    title: [''],
    content: [''],
    pinned: [false],
    created: [''],
    modified: [null],
  });
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

  private sortItems(items: Note[]) {
    return items.sort((a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
      return dateB - dateA;  // Descending order
    });
  }

  private submitNote() {
    if (this.noteForm) {
      this.noteForm.patchValue({
        created: new Date()
      });
      this.storageService.addNote(this.noteForm.value).then(_ => {
        this.storageService.getAllNotes();
      })
      this.isModalOpen = false;
      this.noteForm.reset();
    }
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

  protected onAddNewNote() {
    this.isModalOpen = true;
  }

  protected onDeleteNote(uuid: string) {
    this.presentAlert(uuid);
  }

  protected onToggleBookmark() {
    this.pinned = !this.pinned;
    this.noteForm?.patchValue({pinned: this.pinned});
  }

  protected onCloseModal() {
    if(this.noteForm) {
      const title = this.noteForm.get('title')?.value;
      const content = this.noteForm.get('content')?.value;
      if (title || content) {
        this.submitNote();
      } else {
        this.isModalOpen = false;
        this.noteForm?.reset();
      }
    }
  }
}
