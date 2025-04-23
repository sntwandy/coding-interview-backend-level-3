/**
 *
 */

import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

import {
	getAllItems,
	getItemById,
	createItem,
	updateItem,
	deleteItem,
} from '../services/items.service';
import { Item } from '../models/items.model';

const itemSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required": 'Field "name" is required',
	}),
	price: Joi.number().min(0).required().messages({
		"any.required": 'Field "price" is required',
		"number.min": 'Field "price" cannot be negative',
	}),
});

function formatJoiErrors(err: any) {
	return err.details.map((d: any) => ({
		field: d.context.key,
		message: d.message.replace(/["]/g, '"'),
	}));
}

export function defineItemRoutes(server: Server) {
	// GET /items
	server.route({
		method: 'GET',
		path: '/items',
		handler: async () => getAllItems(),
	});

	// POST /items
	server.route({
		method: 'POST',
		path: '/items',
		options: {
			validate: {
				payload: itemSchema,
				failAction: (_request, h, err) =>
					h
						.response({ errors: formatJoiErrors(err) })
						.code(400)
						.takeover(),
			},
		},
		handler: async (request: Request, h: ResponseToolkit) => {
			const { name, price } = request.payload as Omit<Item, 'id'>;
			const created = await createItem({ name, price });
			return h.response(created).code(201);
		},
	});

	// GET /items/{id}
	server.route({
		method: 'GET',
		path: '/items/{id}',
		handler: async (request, h) => {
			const id = Number(request.params.id);
			const item = await getItemById(id);
			if (!item) return h.response().code(404);
			return h.response(item).code(200);
		},
	});

	// PUT /items/{id}
	server.route({
		method: 'PUT',
		path: '/items/{id}',
		options: {
			validate: {
				payload: itemSchema,
				failAction: (_request, h, err) =>
					h
						.response({ errors: formatJoiErrors(err) })
						.code(400)
						.takeover(),
			},
		},
		handler: async (request, h) => {
			const id = Number(request.params.id);
			const { name, price } = request.payload as Omit<Item, 'id'>;
			const updated = await updateItem(id, { name, price });
			if (!updated) return h.response().code(404);
			return h.response(updated).code(200);
		},
	});

	// DELETE /items/{id}
	server.route({
		method: 'DELETE',
		path: '/items/{id}',
		handler: async (request, h) => {
			const id = Number(request.params.id);
			const ok = await deleteItem(id);
			if (!ok) return h.response().code(404);
			return h.response().code(204);
		},
	});
}
