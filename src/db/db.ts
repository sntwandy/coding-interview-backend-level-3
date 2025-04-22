/**
 *
 */

import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDb() {
	const filename =
		process.env.NODE_ENV === 'test'
			? ':memory:'
			: path.resolve(__dirname, '../data/database.sqlite');

	db = await open({
		filename,
		driver: sqlite3.Database,
	});

	await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      name  TEXT    NOT NULL,
      price REAL    NOT NULL
    );
  `);
}

export function getDb() {
	return db;
}
