/**
 *
 */

import path from 'path';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDb() {
	const dataDir = path.resolve(process.cwd(), 'data');
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
	}

	const filename =
		process.env.NODE_ENV === 'test'
			? ':memory:'
			: path.resolve(dataDir, 'database.sqlite');

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
