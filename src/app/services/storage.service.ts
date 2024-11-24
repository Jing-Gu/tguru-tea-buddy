import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Subject } from 'rxjs'
import { Note } from '../interface/note.interface'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init()
  }

  //private _storage: Storage | null = null;
  private _noteList: Subject<Note[]> = new Subject<Note[]>;
  private _currentNote: Subject<Note> = new Subject<Note>;
  public noteListObs = this._noteList.asObservable();
  public currentNoteObs = this._currentNote.asObservable();

  async init() {
    await this.storage.create();
  }

  async addNote(note: Note): Promise<void> {
    // Save the note with the uuid as the key
    await this.storage.set(note.uuid, note);
  }

  async getNoteByUuid(uuid: string): Promise<Note | null> {
    const note = await this.storage.get(uuid);
    this._currentNote.next(note);
    return note;
  }

  async getAllNotes(): Promise<Note[]> {
    const keys = await this.storage.keys()
    const notes: Note[] = []

    if (keys) {
      for (const key of keys) {
        const note = await this.storage.get(key)
        if (note) {
          notes.push(note)
        }
      }
    }
    this._noteList.next(notes);
    return notes;
  }

  async updateNote(uuid: string, updatedNote: Partial<Note>): Promise<void> {
    const note = await this.storage.get(uuid);
    if (note) {
      const updated = { ...note, ...updatedNote };
      await this.storage.set(uuid, updated);
    }
  }

  async deleteNote(uuid: string): Promise<void> {
    await this.storage.remove(uuid);
  }
}
