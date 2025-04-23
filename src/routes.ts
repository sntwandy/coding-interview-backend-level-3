/**
 *
 */

import { Server } from '@hapi/hapi';
import { defineItemRoutes } from './items/routes/items.route';

export const defineRoutes = (server: Server) => {
	server.route({
		method: 'GET',
		path: '/ping',
		handler: async () => ({ ok: true }),
	});
	defineItemRoutes(server);
};
