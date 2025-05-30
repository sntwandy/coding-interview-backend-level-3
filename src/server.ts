/**
 *
 */

import Hapi from '@hapi/hapi';
import { defineRoutes } from './routes';
import { initDb } from './db/db';

const buildServer = async () => {
	await initDb();
	const server = Hapi.server({
		host: "0.0.0.0",
		port: 3000,
	});
	defineRoutes(server);
	return server;
};

export const initializeServer = async () => {
	const server = await buildServer();
	await server.initialize();
	return server;
};

export const startServer = async () => {
	const server = await buildServer();
	await server.start();
	console.log(`Server running on ${server.info.uri}`);
	return server;
};
