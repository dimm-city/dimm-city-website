import { StrapiClient } from '$lib/Shared/StrapiClient';
import { config } from '$lib/Shared/config';

/**
 * @param {Strapi.APIResponse<DC.GalleryItem>} strapiResponse
 */
function mapStrapiToBiggerPicture(strapiResponse) {
	return {
		items: strapiResponse.data.map((/** @type {DC.GalleryItem} */ item) => {
			/** @type {BiggerPicture.Item} */
			let mappedItem = {
				title: item.attributes.name,
				caption: item.attributes.caption?.replace('\n', '<br/>') ?? '',
				alt: item.attributes.name,
				thumb:
					config.storageBaseUrl +
						item.attributes.mainImage?.data?.attributes?.formats?.thumbnail?.url || '',
				sources: [],
				img: [],
				sizes: ''
			};

			if (item.attributes.width) {
				mappedItem.width = item.attributes.width;
			}

			if (item.attributes.height) {
				mappedItem.height = item.attributes.height;
			}

			if (item.attributes.mainVideo?.data?.attributes?.url) {
				if (Array.isArray(mappedItem.sources))
					mappedItem.sources.push({
						src: config.storageBaseUrl + item.attributes.mainVideo?.data?.attributes.url, // assuming this would contain the video URL
						type: 'video/mp4' // static mime type as an example
					});

			} else {
				// Handling the mainImage srcset
				const imageFormats = item.attributes.mainImage?.data?.attributes?.formats;

				if (imageFormats) {
					mappedItem.img = [];

					for (const format in imageFormats) {
						if (Object.hasOwnProperty.call(imageFormats, format)) {
							// @ts-ignore
							const element = imageFormats[format];
							mappedItem.img.push(`${config.storageBaseUrl + element.url} ${element.width}w`);
							mappedItem.sizes = `${mappedItem.sizes}${element.width}w,`;
						}
					}
					const imgJson = JSON.stringify(mappedItem.img);
					mappedItem.img = imgJson?.substring(1, imgJson.length - 1).replaceAll('"', '');
					mappedItem.sizes = mappedItem.sizes?.slice(0, -1) ?? null;
				}
			}

			return mappedItem;
		})
	};
}
/** @return {Promise<{items: BiggerPicture.Item[]}>} */
export const load = async ({ fetch, params }) => {
	const strapi = new StrapiClient(config.apiBaseUrl, '', fetch);
	const strapiApiResponse = await strapi.search('dimm-city/gallery-items', {
		populate: 'mainImage,mainVideo'
	});

	const biggerPictureFormat = mapStrapiToBiggerPicture(strapiApiResponse);

	// 	let data = {
	// 		items: [
	// 			{
	// 				name: 'Augmerc',
	// 				caption: 'Augmerc',
	// 				height: '1000',
	// 				alt: 'Augmerc',
	// 				thumbnail: 'https://storage.dimm.city/assets/specialties/augmerc.png',
	// 				sources: [
	// 					{ src: 'https://storage.dimm.city/assets/specialties/augmerc.mp4', type: 'video/mp4' }
	// 				]
	// 			},
	// 			{
	// 				name: 'Technosorcerer',
	// 				caption: 'Technosorcerer',
	// 				width: '1262',
	// 				alt: 'Technosorcerer',
	// 				thumbnail: 'https://files.dimm.city/assets/specialties/technosorcerer.png',
	// 				sources: [
	// 					{
	// 						src: 'https://files.dimm.city/assets/specialties/technosorcerer.mp4',
	// 						type: 'video/mp4'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				name: 'Streetwarden',
	// 				caption: 'Streetwarden',
	// 				width: '1262',
	// 				alt: 'Streetwarden',
	// 				thumbnail: 'https://files.dimm.city/assets/specialties/streetwarden.png',
	// 				sources: [
	// 					{ src: 'https://files.dimm.city/assets/specialties/streetwarden.mp4', type: 'video/mp4' }
	// 				]
	// 			},
	// 			{
	// 				name: 'The Dark',
	// 				caption: 'The Dark<br/>Drab Edition',
	// 				width: '1262',
	// 				alt: 'Streetwarden',
	// 				thumbnail: 'https://storage.dimm.city/assets/locations/the-dark.png',
	// 				sources: [
	// 					{
	// 						src: 'https://storage.dimm.city/assets/locations/the-dark-drab-edition.mp4',
	// 						type: 'video/mp4'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				name: 'The Burning Archives',
	// 				caption: 'The Burning Archives<br/>Drab Edition',
	// 				width: '1262',
	// 				alt: 'The Burning Archives',
	// 				thumbnail: 'https://storage.dimm.city/assets/locations/burning-archives.png',
	// 				sources: [
	// 					{
	// 						src: 'https://storage.dimm.city/assets/locations/burning-drab-square.mp4',
	// 						type: 'video/mp4'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				name: 'dice',
	// 				caption: 'dice nuts',
	// 				src: '',
	// 				alt: 'pack',
	// 				thumbnail: 'https://files.dimm.city/pack.png',
	// 				sources: [{ src: 'https://files.dimm.city/pack.mp4', type: 'video/mp4' }]
	// 			}
	// 		]
	// 	};
	// console.log('loaded gallery');
	return biggerPictureFormat;
};
export const ssr = true;
export const csr = true;
export const prerender = true;
