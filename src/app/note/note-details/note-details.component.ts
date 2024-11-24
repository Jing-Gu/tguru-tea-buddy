import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonButtons, IonToolbar, IonBackButton, IonButton, IonIcon, IonContent, IonTextarea, IonFooter, IonTitle, AlertController } from "@ionic/angular/standalone";
import { map, switchMap, tap } from 'rxjs';
import { addIcons } from 'ionicons';
import { chevronBackOutline, star, starOutline, trashOutline } from 'ionicons/icons';
import { StorageService } from 'src/app/services/storage.service';
import { Note } from 'src/app/interface/note.interface'


@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  standalone: true,
  imports: [IonTitle, IonFooter, IonTextarea, IonContent, IonIcon, IonButton, IonHeader, IonButtons, IonToolbar, IonBackButton,
    CommonModule, ReactiveFormsModule
  ]
})
export class NoteDetailsComponent implements OnInit {

  private storageService = inject(StorageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private alertController = inject(AlertController);

  protected currentNote$ = this.storageService.currentNoteObs;
  protected pinned: boolean | undefined;

  protected noteForm = this.fb.group({
    uuid: [''],
    title: [''],
    content: ['', Validators.required],
    pinned: [false],
    created: [''],
    modified: [''],
  });

  constructor() {
    addIcons({
      chevronBackOutline, starOutline, star,
      trashOutline
    })
  }

  private setFormValues(note: Note | null) {
    if (note) {
      this.noteForm.setValue({
        uuid: note.uuid,
        title: note.title,
        content: note.content,
        pinned: note.pinned,
        created: note.created.toISOString(),
        modified: note.modified?.toISOString() || null
      })
      this.pinned = note.pinned;
    }
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params['uuid']),
      switchMap(uuid => this.storageService.getNoteByUuid(uuid))
    ).subscribe(note => this.setFormValues(note))
  }

  protected onToggleBookmark() {
    this.pinned = !this.pinned
  }


  protected updateNote(uuid: string) {
    if (this.noteForm.touched && this.noteForm.dirty) {
      const currentTime = new Date();
      const updated = {
        title: this.noteForm.value.title!,
        content: this.noteForm.value.content!,
        pinned: this.pinned,
        modified: currentTime
      }
      this.storageService.updateNote(uuid, updated).then(_ => {
        this.storageService.getAllNotes()
      })
    }
  }

  protected onDeleteNote(uuid: string) {
    this.presentAlert(uuid);
  }

  private deleteNote(uuid: string) {
    this.storageService.deleteNote(uuid).then(_ => {
      this.router.navigateByUrl('tabs/note');
      this.storageService.getAllNotes();
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
