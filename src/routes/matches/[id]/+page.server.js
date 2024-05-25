import * as api from '$lib/api.js';
import * as constants from '$lib/constants';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
	const events = await api.get(`${constants.events_path}/${params.id}`)
    return events
}
