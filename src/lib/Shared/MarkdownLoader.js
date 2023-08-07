import fs from 'fs';
import { marked } from "marked";
import matter from 'gray-matter';
import path from 'path';

const markdownDir = path.join(process.cwd(), 'src/pages');

/**
 * @param {string} slug
 */
export async function getFile(slug) {
	const filePath = path.join(markdownDir, `${slug}.md`);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(fileContent);
	const html = marked.parse(content);

	return {
		data,
		content: html
	};
}
