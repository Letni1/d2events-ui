import * as api from '$lib/api.js';
import * as constants from '$lib/constants';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const matches = await api.get(constants.matches_preview_path)
    return matches
}