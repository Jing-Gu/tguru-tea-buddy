import { v4 as uuidv4 } from 'uuid';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonButtons, IonToolbar, IonBackButton, IonButton, IonIcon, IonTextarea, AlertController, IonContent, IonNavLink } from "@ionic/angular/standalone";
import { map, switchMap } from 'rxjs';
import { addIcons } from 'ionicons';
import { chevronBackOutline, star, starOutline, trashOutline } from 'ionicons/icons';
import { StorageService } from 'src/app/services/storage.service';
import { Note } from 'src/app/interface/note.interface'


@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  standalone: true,
  imports: [IonNavLink, IonContent, IonTextarea, IonIcon, IonButton, IonHeader, IonButtons, IonToolbar, IonBackButton,
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
  protected pinned: boolean | undefined = false;

  protected newNoteForm: FormGroup = this.fb.group({
    uuid: [uuidv4()],
    title: [''],
    content: [''],
    pinned: [false],
    created: [''],
    modified: [null],
  });

  protected noteForm: FormGroup = this.fb.group({
    uuid: [''],
    title: [''],
    content: ['', Validators.required],
    pinned: [false],
    created: [''],
    modified: [''],
  });

  constructor() {
    addIcons({trashOutline,chevronBackOutline,starOutline,star});
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

  private deleteNote(uuid: string) {
    this.storageService.deleteNote(uuid).then(_ => {
      this.router.navigateByUrl('tabs/note');
      this.storageService.getAllNotes();
    })
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params['uuid']),
      switchMap(uuid => this.storageService.getNoteByUuid(uuid))
    ).subscribe(note => this.setFormValues(note));
  }

  protected onToggleBookmark() {
    this.pinned = !this.pinned
  }



  protected onUpdateNote(uuid?: string) {
    if (!uuid) {
      // on leaving a new note
      if(this.newNoteForm) {
        const title = this.newNoteForm.get('title')?.value;
        const content = this.newNoteForm.get('content')?.value;
        if (title || content) {
          this.submitNote();
        } else {
          this.newNoteForm?.reset();
        }
      }
    } else {
      // on leaving an existing note
      if (this.noteForm.touched && this.noteForm.dirty) {
        const updated = {
          title: this.noteForm.value.title!,
          content: this.noteForm.value.content!,
          pinned: this.pinned,
          modified: new Date()
        }
        this.storageService.updateNote(uuid, updated).then(_ => {
          this.storageService.getAllNotes()
        })
      }
    }
    this.router.navigateByUrl('tabs/note');
  }

  protected onDeleteNote(uuid: string) {
    this.presentAlert(uuid);
  }

  private submitNote() {
    if (this.newNoteForm) {
      this.newNoteForm.patchValue({
        created: new Date()
      });
      this.storageService.addNote(this.newNoteForm.value).then(_ => {
        this.storageService.getAllNotes();
      })
      this.newNoteForm.reset();
    }
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
