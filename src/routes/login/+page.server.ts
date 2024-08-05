import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthApiError, type Provider } from '@supabase/supabase-js';

export const actions: Actions = {
	login: async ({ request, locals, url }) => {
		console.log('körs');
		const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
			provider: 'github'
		});

		if (err) {
			console.log(err);
			return fail(400, {
				message: 'Something went wrong.'
			});
		}

		throw redirect(303, data.url);
	}
};
