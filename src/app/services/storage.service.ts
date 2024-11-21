import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs'
import { Note } from '../interface/note.interface'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init()

  }
  private _storage: Storage | null = null;
  private _noteList: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  public noteListObs = this._noteList.asObservable();

  async init() {
    this._storage = await this.storage.create();
    console.log("stor", this._storage)
  }

  async addNote(note: Note): Promise<void> {
    // Save the note with the uuid as the key
    await this.storage.set(note.uuid, note);
  }

  async getNoteByUuid(uuid: string): Promise<Note | null> {
    return await this.storage.get(uuid);
  }

  async getAllNotes(): Promise<Note[]> {
    const keys = await this.storage.keys()
    const notes: Note[] = []

    for (const key of keys) {
      const note = await this.storage.get(key)
      if (note) {
        notes.push(note)
      }
    }

    console.log("aa", notes)
    this._noteList.next(notes);

    return notes
  }

  async updateNote(uuid: string, updatedNote: Partial<Note>): Promise<void> {
    const note = await this.storage.get(uuid);
    if (note) {
      const updated = { ...note, ...updatedNote, modified: new Date() };
      await this.storage.set(uuid, updated);
    }
  }

  async deleteNote(uuid: string): Promise<void> {
    await this.storage.remove(uuid);
  }
}
