export const getDistrictsQuery = `
query {
	locations(filters: { region: { id: { eq: null } } }) {
		data {
			id
			attributes {
				slug
				name
				description
				shortDescription
				mainImage {
					data {
						attributes {
							url
							previewUrl
						}
					}
				}
			}
		}
	}
}`;
