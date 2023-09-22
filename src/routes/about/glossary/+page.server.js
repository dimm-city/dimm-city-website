import { getFile } from '$lib/Shared/MarkdownLoader';

export const load = async ({ params }) => {
	const file = await getFile('glossary');
	return {
		content: file?.content || null,
		data: file?.data || null
	};
};
