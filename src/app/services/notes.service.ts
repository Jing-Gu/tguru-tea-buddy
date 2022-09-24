import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = [];
  selectedNote: Note;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    //await this.storage.defineDriver();
    await this.storage.create();
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
    const d = new Date();
    let id;
    if (this.notes && this.notes.length > 0) {
      id = Math.max(...this.notes.map(note => note.id), 0) + 1;
    } else {
      id = 0;
      this.notes = [];
    };
    this.notes.push({
      id,
      title,
      content,
      creationTime: d,
      modifiedTime: null,
      pinned: null,
    });
    this.saveNotes();
  }

  updateNote(title, content) {
    const d = new Date();
    this.selectedNote.title = title;
    this.selectedNote.content = content;
    this.selectedNote.modifiedTime = d;
    this.saveNotes();
  }

  pinNote(pinnded: boolean) {
    this.selectedNote.pinned = pinnded;
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
