// src/lib/markdownLoader.js
import fs from 'fs';
import { marked } from "marked";
import matter from 'gray-matter';

//const markdownDir = path.join(process.cwd(), 'src/routes/markdown');

// export async function getFiles() {
// 	const filenames = fs.readdirSync(markdownDir);
// 	return filenames.map((filename) => filename.replace('.md', ''));
// }

/**
 * @param {string} filePath
 */
export async function getFile(filePath) {
	//const filePath = path.join(markdownDir, `${slug}.md`);

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
