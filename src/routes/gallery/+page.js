export const load = async () => {
	return {
		items: [
			{
				name: 'Augmerc',
				caption: 'Augmerc',
				height: '1000',
				alt: 'Augmerc',
				thumbnail: 'https://storage.dimm.city/assets/specialties/augmerc.png',
				sources: [
					{ src: 'https://storage.dimm.city/assets/specialties/augmerc.mp4', type: 'video/mp4' }
				]
			},
			{
				name: 'Technosorcerer',
				caption: 'Technosorcerer',
				width: '1262',
				alt: 'Technosorcerer',
				thumbnail: 'https://files.dimm.city/assets/specialties/technosorcerer.png',
				sources: [
					{
						src: 'https://files.dimm.city/assets/specialties/technosorcerer.mp4',
						type: 'video/mp4'
					}
				]
			},
			{
				name: 'Streetwarden',
				caption: 'Streetwarden',
				width: '1262',
				alt: 'Streetwarden',
				thumbnail: 'https://files.dimm.city/assets/specialties/streetwarden.png',
				sources: [
					{ src: 'https://files.dimm.city/assets/specialties/streetwarden.mp4', type: 'video/mp4' }
				]
			},
			{
				name: 'The Dark',
				caption: 'The Dark<br/>Drab Edition',
				width: '1262',
				alt: 'Streetwarden',
				thumbnail: 'https://storage.dimm.city/assets/locations/the-dark.png',
				sources: [
					{
						src: 'https://storage.dimm.city/assets/locations/the-dark-drab-edition.mp4',
						type: 'video/mp4'
					}
				]
			},
			{
				name: 'The Burning Archives',
				caption: 'The Burning Archives<br/>Drab Edition',
				width: '1262',
				alt: 'The Burning Archives',
				thumbnail: 'https://storage.dimm.city/assets/locations/burning-archives.png',
				sources: [
					{
						src: 'https://storage.dimm.city/assets/locations/burning-drab-square.mp4',
						type: 'video/mp4'
					}
				]
			},
			{
				name: 'dice',
				caption: 'dice nuts',
				src: '',
				alt: 'pack',
				thumbnail: 'https://files.dimm.city/pack.png',
				sources: [{ src: 'https://files.dimm.city/pack.mp4', type: 'video/mp4' }]
			}
		]
	};
};
export const ssr = false;
export const csr = true;
export const prerender = true;
