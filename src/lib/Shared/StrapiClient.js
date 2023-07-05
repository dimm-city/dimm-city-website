import qs from 'qs';

export class Strapi {
	/**
	 * @param {string} baseURL
	 */
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	/**
	 * @param {string} contentType
	 * @param {any} query
	 */
	_getUrlWithQuery(contentType, query) {
		const stringifiedQuery = qs.stringify(query);
		return `${this.baseURL}/${contentType}?${stringifiedQuery}`;
	}

	/**
	 * @param {string} contentType
	 * @param {any} query
	 */
	async search(contentType, query) {
		const url = this._getUrlWithQuery(contentType, query);

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error in search:', error);
		}
	}

	/**
	 * @param {string} contentType
	 * @param {Number} id
	 */
	async load(contentType, id, query = {}) {
		const url = `${this.baseURL}/${contentType}/${id}?${qs.stringify(query)}`;

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error in load:', error);
		}
	}

	/**
	 * @param {string} contentType
	 * @param {any} slug
	 * @param {any} query
	 */
	async loadBySlug(contentType, slug, query = {}) {
		query.slug = slug;
		if (query.populate == null) query.populate = '*';
		if (query.filters == null)
			query.filters = {
				slug: {
					$eq: slug
				}
			};

		const url = this._getUrlWithQuery(contentType, query);

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const json = await response.json();

			if (json?.data[0] == null)
				console.error('No data returned during load by slug', url, contentType, query, json);
			// Since we're searching by slug, we might get multiple results.
			// We're interested only in the first one.
			return json.data[0];
		} catch (error) {
			console.error('Error in loadBySlug:', error);
		}
	}
}
