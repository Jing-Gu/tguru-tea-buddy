import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonTextarea, IonList, IonFab, IonFabButton, IonIcon,
  IonModal, IonButtons, IonButton, AlertController, IonItemOptions, IonItemOption, IonItemSliding, IonProgressBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, chevronBackOutline, saveOutline, starOutline, star , trash, fileTrayOutline } from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from 'src/app/services/storage.service'


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
  private alertController = inject(AlertController);
  private fb = inject(FormBuilder);
  private storageService = inject(StorageService);

  protected isModalOpen = false;
  protected pinned = false;
  protected noteForm: FormGroup | undefined;

  protected notes$ = this.storageService.noteListObs;

  constructor() {
    addIcons({createOutline, chevronBackOutline, starOutline, star,
      saveOutline, trash, fileTrayOutline});
  }

  ngOnInit() {
    this.storageService.getAllNotes();
    this.noteForm = this.fb.group({
      uuid: [''],
      title: [''],
      content: ['', Validators.required],
      pinned: [false],
      created: [''],
      modified: [null],
    });
  }

  protected submitNote() {
    if (this.noteForm && this.noteForm.valid) {
      const currentTime = new Date();
      this.noteForm.patchValue({
        uuid: uuidv4(),
        created: currentTime
      });

      console.log(this.noteForm.value);
      this.storageService.addNote(this.noteForm.value).then(_ => {
        this.storageService.getAllNotes();
      })
      this.isModalOpen = false;
      this.noteForm.reset();
    }
  }

  protected addNewNote() {
    this.isModalOpen = true;
    // this.noteForm?.reset();
    // this.pinned = false;
  }

  protected deleteNote(uuid: string) {
    this.storageService.deleteNote(uuid).then(_ => {
      this.storageService.getAllNotes()
    })
  }

  protected toggleBookmark() {
    this.pinned = !this.pinned;
  }

  protected closeModal() {
    if(this.noteForm) {
      const title = this.noteForm.get('title')?.value;
      const content = this.noteForm.get('content')?.value;
      if (!title && !content) {
        this.isModalOpen = false;
      } else {
        this.presentAlert();
      }
    }
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Note not saved',
      message: 'Do you want to save it?',
      backdropDismiss: false,
      cssClass: 'alertbox',
      buttons: [{
        text: 'Delete',
        role: 'cancel',
        cssClass: 'btnCancel',
        handler: () => {
          this.isModalOpen = false;
          this.noteForm?.reset();
        },
      },
      {
        text: 'Save',
        role: 'confirm',
        cssClass: 'btnSave',
        handler: () => {
          this.submitNote();
        },
      },],
    });
    await alert.present();
  }
}
