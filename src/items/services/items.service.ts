/**
 *
 */

import { getDb } from '../../db/db';
import { Item } from '../models/items.model';

export async function getAllItems(): Promise<Item[]> {
	return getDb().all('SELECT * FROM items');
}

export async function getItemById(id: number): Promise<Item | undefined> {
	return getDb().get('SELECT * FROM items WHERE id = ?', id);
}

export async function createItem(data: Omit<Item, 'id'>): Promise<Item> {
	const result = await getDb().run(
		'INSERT INTO items (name, price) VALUES (?, ?)',
		data.name,
		data.price
	);
	return { id: result.lastID!, name: data.name, price: data.price };
}

export async function updateItem(
	id: number,
	data: Omit<Item, 'id'>
): Promise<Item | null> {
	const result = await getDb().run(
		'UPDATE items SET name = ?, price = ? WHERE id = ?',
		data.name,
		data.price,
		id
	);
	if ((result.changes ?? 0) === 0) return null;
	return { id, name: data.name, price: data.price };
}

export async function deleteItem(id: number): Promise<boolean> {
	const result = await getDb().run('DELETE FROM items WHERE id = ?', id);
	return (result.changes ?? 0) > 0;
}
