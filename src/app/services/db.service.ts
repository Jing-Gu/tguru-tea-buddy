import { inject, Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SqliteService } from './sqlite.service';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../interface/note.interface';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db!: SQLiteDBConnection;
  private sqliteService = inject(SqliteService)
  private platform = "";
  private dbName = "tguruNotes.db";
  private isNoteReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private noteList: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  public noteReadyObs = this.isNoteReady.asObservable();
  public noteListObs = this.noteList.asObservable();

  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    console.log('Initializing database');
    await this.sqliteService.initializePlugin();
    this.platform = this.sqliteService.platform;
    console.log('Platform:', this.platform);
    try {
      if (this.platform === 'web') {
        console.log('Initializing database for web');
        await this.sqliteService.initWebStore();
        await this.sqliteService.saveToStore(this.dbName);
      }
      // create and/or open the database
      this.db = await this.sqliteService.openDatabase(this.dbName, false, 'no-encryption', 1, false);
      console.log('Database connection:', this.db);
      await this.getNotes();
      // Here Initialize MOCK_DATA if required

      // Initialize whatever database and/or MOCK_DATA you like

    } catch (error) {
      console.error('Error initializing database:', error);
    }

  }




  async loadNotes() {
    if (this.db) {
      const sql = `SELECT * FROM ${this.dbName};`;
      const notes: Note[] = (await this.db.query(sql)).values as Note[];
      this.noteList.next(notes);
      console.log('Notes:', notes);
    }
  }

  async getNotes() {
    await this.loadNotes();
    this.isNoteReady.next(true);
  }

  async addNote(note: Note) {
    console.log('Adding note:', note, "db:", this.db);
    const sql = `INSERT INTO ${this.dbName} (id, title, content, pinned, created, modified) VALUES (?,?,?,?,?,?)`;
    await this.db.run(sql, [note.id, note.title, note.content, note.pinned, note.created, note.modified]);
    await this.getNotes();

  }

  async updateNoteById(note: Note) {
    if (this.db) {
      const sql = `UPDATE ${this.dbName} SET title = ?, content = ?, pinned = ?, modified = ? WHERE id = ?`;
      await this.db.run(sql, [note.title, note.content, note.pinned, note.modified, note.id]);
      await this.getNotes();
    }
  }

  async deleteNoteById(id: string) {
    if (this.db) {
      const sql = `DELETE FROM ${this.dbName} WHERE id =${id}`;
      await this.db.run(sql);
      await this.getNotes();
    }
  }
}
