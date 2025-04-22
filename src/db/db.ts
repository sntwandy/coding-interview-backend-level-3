import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDb() {
	// 1) Asegúrate de que la carpeta ./data exista
	const dataDir = path.resolve(process.cwd(), "data");
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
	}

	// 2) Construye la ruta al fichero en la raíz del proyecto
	const filename =
		process.env.NODE_ENV === "test"
			? ":memory:"
			: path.resolve(dataDir, "database.sqlite");

	// 3) Ábrelo (lo creará si no existía)
	db = await open({
		filename,
		driver: sqlite3.Database,
	});

	// 4) Crea tu tabla si hace falta
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
