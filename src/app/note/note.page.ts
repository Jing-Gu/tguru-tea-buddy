import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  isModalOpen = false;

  noteForm: FormGroup;
  note;

  constructor(public noteService: NotesService) { }

  ngOnInit() {
    this.noteService.loadNotes();
    this.noteForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl('', Validators.required)
    });
  }


  addNewNote() {
    this.isModalOpen = true;
    this.noteForm.reset();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openNote() {
    this.isModalOpen = true;
  }

  submitNote() {
    this.isModalOpen = false;
    const title = this.noteForm.get('title').value;
    const content = this.noteForm.get('content').value;
    this.noteService.createNote(title, content);
  }

}
