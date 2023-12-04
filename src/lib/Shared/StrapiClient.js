import qs from 'qs';

export class StrapiClient {
	/**
	 * @param {string} baseURL
	 * @param {string|null} jwt
	 * @param {any} _fetch
	 */
	constructor(baseURL, jwt = null, _fetch = null) {
		this.baseURL = baseURL;
		this.jwt = jwt;
		this.fetch = _fetch || fetch;
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
	 * @template T
	 * @returns {(Promise<Strapi.APIResponse<T | null>>)}
	 */
	async search(contentType, query) {
		const url = this._getUrlWithQuery(contentType, query);
		let options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		if (this.jwt) {			
			// @ts-ignore
			options.headers.Authorization = `Bearer ${this.jwt}`;
		}

		try {
			const response = await this.fetch(url,options);

			if (!response.ok) {
				throw new Error('Network response was not ok' + url);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error in search:', error);
			return {
				data: [],
				meta: {
					pagination: {
						page: 0,
						pageSize: 0,
						total: 0,
						pageCount: 0
					}
				}
			};
		}
	}

	/**
	 * @param {string} contentType
	 * @param {Number} id
	 */
	async load(contentType, id, query = {}) {
		const url = `${this.baseURL}/${contentType}/${id}?${qs.stringify(query)}`;

		try {
			const response = await this.fetch(url);

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
		//query.slug = slug;
		if (query.populate == null) query.populate = '*';
		if (query.filters == null)
			query.filters = {
				slug: {
					$eq: slug
				}
			};

		const url = this._getUrlWithQuery(contentType, query);

		try {
			const response = await this.fetch(url, {
				Authorization: `Bearer ${this.jwt}`,
				'Content-Type': 'application/json',
				'Allow-Control-Allow-Origin': '*'
			});

			if (!response.ok) {
				throw new Error('Network response was not ok', response.statusText);
			}

			const json = await response.json();

			if (json?.data[0] == null)
				console.debug('No data returned during load by slug', url, contentType, query, json);
			// Since we're searching by slug, we might get multiple results.
			// We're interested only in the first one.
			return json.data[0];
		} catch (error) {
			console.error('Error in loadBySlug:', error);
		}
	}

	/**
	 * @param {any} contentType
	 * @param {{ id: any; attributes: any; }} entity
	 */
	async updateEntity(contentType, entity) {
		console.log('updating entity', entity);

		await this.fetch(`${this.baseURL}/${contentType}/${entity.id}?populate=*`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${this.jwt}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data: entity })
		})
			.then(async (/** @type {{ json: () => PromiseLike<{ data: any; errors: any; }> | { data: any; errors: any; }; ok: any; }} */ res) => {
				const { data, errors } = await res.json();
				if (res.ok) {
					console.assert(data != null);
					console.log('updated', data);
				} else {
					//TODO: display error
					console.error('failed', errors, data);
				}
			})
			.catch((/** @type {any} */ reason) => {
				console.log('could not update character', reason);
			});
	}
}
