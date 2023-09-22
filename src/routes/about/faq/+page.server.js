import { getFile } from '$lib/Shared/MarkdownLoader';

export const load = async ({ params }) => {
	const file = await getFile('faq');
	return {
		content: file?.content || null,
		data: file?.data || null
	};
};
