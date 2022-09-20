import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = [];
  selectedNote;
  loaded = false;


  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storage.create();
  }

  async loadNotes() {
    this.notes = await this.storage.get('notes');
  }

  async saveNotes() {
    return await this.storage.set('notes', this.notes);
  }

  async getNote(id) {
    this.notes = await this.storage.get('notes');
    this.selectedNote = await this.notes.filter((n: Note) => n.id.toString() === id)[0];
  }

  createNote(title, content) {
    const id = Math.max(...this.notes.map(note => note.id), 0) + 1;
    this.notes.push({
      id,
      title,
      content,
    });
    this.saveNotes();
  }

  updateNote(title, content) {
    this.selectedNote.title = title;
    this.selectedNote.content = content;
    this.saveNotes();
  }

  deleteNote() {
    const delIndex = this.notes.indexOf(this.selectedNote);
    if (delIndex > -1) {
      this.notes.splice(delIndex, 1);
      this.saveNotes();
    }
  }

}
