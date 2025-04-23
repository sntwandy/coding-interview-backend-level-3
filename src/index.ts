/**
 *
 */

import { initDb } from './db/db';
import { initializeServer, startServer } from './server';

async function main() {
	await initDb();
	await startServer();
}

main();
