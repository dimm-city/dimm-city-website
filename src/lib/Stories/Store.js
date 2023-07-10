export async function getStories() {
	return [
		{
			slug: 'introduction',
			name: 'Welcome to Dimm City',
			description: 'An introduction to the world of Dimm City where the Sporos live',
			icon: 'bi bi-building'
		},
		{
			slug: 'prologue-scene-1',
			name: 'Prologue - Scene 1',
			description: 'Connection established',
			icon: 'bi bi-cpu-fill'
		},
		{
			slug: 'prologue-scene-2',
			name: 'Prologue - Scene 2',
			description: 'In the beginning...',
			icon: 'bi bi-house'
		},
		{
			slug: '',
			name: 'Locked',
			description: 'identity unknown',
			icon: 'bi bi-safe',
			disabled: true
		}
	];
}