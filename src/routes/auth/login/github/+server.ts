import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase }, url }) => {
	const { data } = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: url.origin + '/dashboard'
		}
	});

	if (data.url) {
		redirect(307, data.url);
	}

	redirect(307, '/auth/error');
};
