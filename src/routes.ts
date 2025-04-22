/**
 *
 */

import { Server } from '@hapi/hapi';
import { defineItemRoutes } from './items/routes/items.routes';

export const defineRoutes = (server: Server) => {
	server.route({
		method: 'GET',
		path: '/ping',
		handler: async () => ({ ok: true }),
	});

	// CRUD for /items
	defineItemRoutes(server);
};
