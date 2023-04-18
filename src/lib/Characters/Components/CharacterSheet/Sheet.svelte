<!-- CharacterSheet.svelte -->
<script lang="ts">
	import './Sheet.css';
	import { openModal } from 'svelte-modals';
	import AbilityModal from '../AbilityModal.svelte';
	import ContentModal from '../ContentModal.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import List from '$lib/Shared/Components/List.svelte';

	export let character: ICharacter;

	function viewAbility(ability: any) {
		openModal(AbilityModal, { data: ability });
	}

	function viewText(text: string) {
		openModal(ContentModal, { data: text });
	}

	const skills: object[] = [];
	// for (let index = 0; index < 10; index++) {
	// 	skills.push({
	// 		attributes: {
	// 			name: `ability ${index}`,
	// 			ap: Math.round(index / 2),
	// 			description: 'does some cool stuff and then ' + index + ' more things...'
	// 		}
	// 	});
	// }
</script>

<div class="scroll-wrapper">
	<div
		class="sheet"
		data-augmented-ui="bl-2-clip-y br-2-clip-y tl-2-clip-xy tr-2-clip-xy l-rect r-rect t-clip both"
	>
		<div class="heading">
			<div>
				<h1>
					{character.name}
				</h1>
			</div>
			<div>
				<button class="aug-button" data-augmented-ui="all-hex"><i class="bi bi-menu-app" /></button>
			</div>
			<div>
				<h2>
					Specialty: {character.specialties?.data?.length > 0
						? character.specialties?.data.join(', ')
						: 'Unknown'}
				</h2>
			</div>
		</div>
		<div class="container" data-augmented-ui-reset>
			<div class="stats-row" data-augmented-ui="tl-clip tr-clip br-clip-x bl-clip-x both">
				<div class="stats-heading"><h3>Physical Stats</h3></div>
				<div class="scores-heading" />
				<div class="cyber-heading">
					<h3>Cybernetics</h3>
				</div>
				<div class="stats-container">
					<div class="image">
						<Image imageUrl={character.imageUrl} title="Profile" height="200px" width="150px" />
					</div>
					<div class="physical-stats">
						<div>
							Pronouns:
							<span>{character.pronouns || 'they/them'}</span>
						</div>
						<div>
							Age:
							<span>{character.age ?? 'Unknown'} </span>
						</div>
						<div>
							Race:
							<span>
								{#if character.race}
									{character.race.data?.attributes?.name}
								{/if}
							</span>
						</div>
						<div>
							Height:
							<span>{character.height || 0} m</span>
						</div>
						<div>
							Weight:
							<span>{character.weight || 0} kg</span>
						</div>
						<div>
							Eyes:
							<span>{character.eyes || ''}</span>
						</div>
						<div>
							Skin:
							<span>{character.skin || ''}</span>
						</div>
						<!-- <div>
						Hair:
						<span>{character.hair || ''}</span>
					</div> -->
					</div>
				</div>
				<div class="scores-container">
					<div class="hp">
						<h4>HP</h4>
						<div data-augmented-ui="all-hex border">
							<span>10</span><small>10</small>
						</div>
					</div>
					<div class="ap">
						<h4>AP</h4>
						<div data-augmented-ui="all-hex border">10</div>
					</div>
				</div>
				<div class="cybernetics-container">
					<List data={skills} maxItems={5} noItemsText="No cybernetics registered">
						<div let:item slot="item">
							<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
								>{item.attributes.name}</button
							>
						</div>
					</List>
				</div>
			</div>
			<div class="profile-row" data-augmented-ui="tl-clip-x tr-clip-x br-clip bl-clip border">
				<div class="profile-heading"><h3>Profile</h3></div>
				<section class="section-container">
					<div>
						Vibe:
						<span>{character.vibe || 'they/them'}</span>
					</div>
					<div>
						Beliefs:
						<span>{character.beliefs ?? 'Unknown'} </span>
					</div>
					<div>
						Flaws:<span>{character.flaws ?? 'Unknown'} </span>
					</div>
					<div>
						Origin:<span>{character.currentLocation?.name ?? 'Unknown'} </span>
					</div>
					<div>
						Current District:
						<span>{character.currentLocation?.name ?? 'Unknown'} </span>
					</div>
				</section>
				<section class="section-container">
					<div class="text-section">
						<div class="text-section-header">
							<span>Backstory:</span>
							<i
								class="btn inline bi bi-fullscreen"
								on:keypress={() => viewText(character.backstory)}
								on:click={() => viewText(character.backstory)}
							/>
						</div>
						<div class="text-container" data-augmented-ui=" tr-clip bl-clip border">
							{character.backstory}
						</div>
					</div>
				</section>
				<section class="section-container">
					<div class="text-section">
						<div class="text-section-header">
							<span>Dreams:</span>
							<i
								class="btn inline bi bi-fullscreen"
								on:keypress={() => viewText(character.dreams)}
								on:click={() => viewText(character.dreams)}
							/>
						</div>
						<div class="text-container" data-augmented-ui="tr-clip bl-clip  border">
							{character.dreams}
						</div>
					</div>
				</section>
			</div>
			<div class="lists-row" data-augmented-ui-reset>
				<div class="skills-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
					<h3 class="section-title">Skills</h3>
					<List data={skills} maxItems={-1} noItemsText="No skills recorded">
						<div let:item slot="item">
							<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
								>{item.attributes.name}</button
							>
						</div>
					</List>
				</div>
				<div class="items-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
					<h3 class="section-title">Items</h3>
					<List data={skills} maxItems={-1} noItemsText="No inventory recorded">
						<div let:item slot="item">
							<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
								>{item.attributes.name}</button
							>
						</div>
					</List>
				</div>
				<div class="scripts-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip none">
					<h3 class="section-title">Scripts</h3>
					<List data={skills} maxItems={-1} noItemsText="No scripts detected">
						<div let:item slot="item">
							<button data-augmented-ui class="aug-button" on:click={() => viewAbility(item)}
								>{item.attributes.name}</button
							>
						</div>
					</List>
				</div>
			</div>
		</div>
	</div>
</div>
