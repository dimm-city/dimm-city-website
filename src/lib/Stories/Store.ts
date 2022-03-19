export async function getStories() {
	return [
		{
			slug: 'introduction',
			title: 'Welcome to Dimm City',
			description: 'An introduction to the world of Dimm City where the Sporos live',
			icon: 'bi bi-building'
		},
		{
			slug: 'prologue-scene-1',
			title: 'Prologue - Scene 1',
			description: 'Connection established',
			icon: 'bi bi-cpu-fill'
		},
		{
			slug: '',
			title: 'Prologue - Scene 2',
			description: 'generating...',
			icon: 'bi bi-terminal',
			disabled: true
		},
		{
			slug: '',
			title: 'Locked',
			description: 'identity unknown',
			icon: 'bi bi-safe',
			disabled: true
		}
	];
}