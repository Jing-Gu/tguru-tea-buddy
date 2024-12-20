import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, CapacitorSQLitePlugin, capSQLiteUpgradeOptions, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  sqliteConnection!: SQLiteConnection;
  isService: boolean = false;
  platform = Capacitor.getPlatform();
  sqlitePlugin!: CapacitorSQLitePlugin;
  native: boolean = false;

  async initializePlugin(): Promise<boolean> {
    if (this.platform === 'ios' || this.platform === 'android') {
      this.native = true;
    }
    this.sqlitePlugin = CapacitorSQLite;
    this.sqliteConnection = new SQLiteConnection(this.sqlitePlugin);
    this.isService = true;
    return true;
  }

  async initWebStore(): Promise<void> {
    try {
      await this.sqliteConnection.initWebStore();
      console.log("initWebStore: success");
    } catch (err: any) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`initWebStore: ${msg}`);
    }
  }

  async openDatabase(dbName: string, encrypted: boolean, mode: string, version: number, readonly: boolean): Promise<SQLiteDBConnection> {
    let db: SQLiteDBConnection;
    const retCC = (await this.sqliteConnection.checkConnectionsConsistency()).result;
    let isConn = (await this.sqliteConnection.isConnection(dbName, readonly)).result;
    if (retCC && isConn) {
      db = await this.sqliteConnection.retrieveConnection(dbName, readonly);
    } else {
      db = await this.sqliteConnection
        .createConnection(dbName, encrypted, mode, version, readonly);
    }
    await db.open();
    const sql = `CREATE TABLE IF NOT EXISTS ${dbName} (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT,
      pinned INTEGER,
      created TEXT,
      modified TEXT);`;
    await db.execute(sql);
    return db;
  }

  async retrieveConnection(dbName: string, readonly: boolean): Promise<SQLiteDBConnection> {
    return await this.sqliteConnection.retrieveConnection(dbName, readonly);
  }
  async closeConnection(database: string, readonly?: boolean): Promise<void> {
    const readOnly = readonly ? readonly : false;
    return await this.sqliteConnection.closeConnection(database, readOnly);
  }
  async addUpgradeStatement(options: capSQLiteUpgradeOptions): Promise<void> {
    await this.sqlitePlugin.addUpgradeStatement(options);
    return;
  }
  async saveToStore(database: string): Promise<void> {
    console.log("saveToStore", database);
    return await this.sqliteConnection.saveToStore(database);
  }
}
