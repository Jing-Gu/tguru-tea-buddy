import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonTextarea, IonList, IonFab, IonFabButton, IonIcon,
  IonModal, IonButtons, IonButton, AlertController, IonItemOptions, IonItemOption, IonItemSliding } from '@ionic/angular/standalone';
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
    CommonModule, RouterLink, FormsModule, ReactiveFormsModule,
    IonItemSliding, IonItemOption, IonItemOptions, IonButtons, IonButton,
    IonModal, IonIcon, IonFabButton, IonFab, IonList, IonLabel, IonTextarea, IonItem, IonContent, IonHeader, IonTitle, IonToolbar
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

  dummyMemos = [
    {
      id: 1,
      title: 'test one',
      // eslint-disable-next-line max-len
      content: 'If you want to be sure the splash screen never disappears before your app is ready, set launchAutoHide to false; the splash screen will then stay visible until manually hidden. For the best user experience, your app should call hide() as soon as possible.',
      pinned: 1
    },
    {
      id: 2,
      title: '',
      // eslint-disable-next-line max-len
      content: 'Terminal software ',
      pinned: 0
    },
    {
      id: 3,
      title: 'Hiding the Splash Screen',
      // eslint-disable-next-line max-len
      content: 'that the emulator is not the shell. Its just a piece of softnt.',
      pinned: 1
    },
    {
      id: 4,
      title: 'The Terminal (Emulator)',
      // eslint-disable-next-line max-len
      content: 'written by Steve Bourne. Since it was highly inspired by the sh, which was written by Steve Bourne, the folks at the GNU project decided to name the new.',
      pinned: 0
    },
    {
      id: 5,
      title: 'What Can You Do Next ',
      // eslint-disable-next-line max-len
      content: 'If you want to be sure the splash screen never disappears before your app is ready, set launchAutoHide to false; the splash screen will then stay visible until manually hidden. For the best user experience, your app should call hide() as soon as possible.',
      pinned: 1
    },
    {
      id: 6,
      title: 'What Can You Do Next six',
      // eslint-disable-next-line max-len
      content: 'If you want to be sure the splash screen never disappears before your app is ready, set launchAutoHide to false; the splash screen will then stay visible until manually hidden. For the best user experience, your app should call hide() as soon as possible.',
      pinned: 1
    },
  ];

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
      pinned: false,
      created: [''],
      modified: [''],
    });
  }

  protected submitNote() {
    if (this.noteForm && this.noteForm.valid) {
      const currentTime = new Date();
      this.noteForm.patchValue({
        uuid: uuidv4(),
        created: currentTime,
        modified: currentTime
      });

      console.log(this.noteForm.value);
      this.storageService.addNote(this.noteForm.value);
      this.storageService.getAllNotes();
      this.notes$ = this.storageService.noteListObs;
      this.isModalOpen = false;
      this.noteForm.reset();
    }
  }

  protected addNewNote() {
    this.isModalOpen = true;
    // this.noteForm?.reset();
    // this.pinned = false;
  }

  protected deleteNote(index: string) {

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
