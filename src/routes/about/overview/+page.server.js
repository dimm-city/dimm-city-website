import { getFile } from '$lib/Shared/MarkdownLoader';

export const load = async ({ params }) => {
	const file = await getFile('./op-manual/website/overview.md');
	return {
		content: file?.content || null,
		data: file?.data || null
	};
};
