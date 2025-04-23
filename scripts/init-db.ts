/**
 *
 */

import { initDb } from "../src/db/db";

initDb()
	.then(() => {
		console.log("✔ database.sqlite creado en ./data");
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
