<script lang="ts">
	import './characters.css';
	export let character;
</script>

<div class="character-container">
	<div class="title-container">
		<div>
			<h1>Dimm City</h1>
			<h5>Character Sheet</h5>
		</div>
	</div>

	{#if character != null}
		<div class="parent">
			<div class="container">
				<div>Name:{character.name}</div>
				<div class="stats">
					<h4>HP: <span class="points-block">{character.hp || 10}</span></h4>
					<h4>AP: <span class="points-block">{character.ap || 10}</span></h4>
				</div>
				<div class="details">
					<div>Pronouns: {character.pronouns || 'they/them'}</div>
					<div>Age: {character.age || 0} years</div>
					<div>Height: {character.height || 0} m</div>
					<div>Weight: {character.weight || 0} kg</div>
					<div>Eyes: {character.eyes || ''}</div>
					<div>Skin: {character.skin || ''}</div>
					<div>Hair: {character.hair || ''}</div>
					<div>Vibe: {character.vibe || ''}</div>
					<!-- <div>Accessories: {character.height}</div> -->
				</div>
				<div>
					Role(s):
					<ul>
						{#if character.roles}
							{#each character.roles.data as role}
								<li>{role.attributes.name}</li>
							{/each}
						{/if}
					</ul>
				</div>
				<div>
					Race: {#if character.race}
						{character.race.data.attributes.name}
					{/if}
				</div>

				<div class="image">
					<img
						src="https://lh3.googleusercontent.com/TFxb5LSw_-CdlY_JZ27-LBYzwCallPv6ZLNJQrhWSOoUUy2YKnd1VqZaOjotTPk-hjZ73UiC0kaCbb__4lbJ2_CYxFjN8iYqX37m5g=w600"
						alt=""
					/>
				</div>

				<div>
					Racial Abilities
					<ul>
						{#if character.race}
							{#each character.race.data.attributes.abilities.data as ability}
								<li class="small-menu-item" data-augmented-ui>
									<a href="#{ability.attributes.slug}"> {ability.attributes.name}</a>
								</li>
							{/each}
						{/if}
					</ul>
				</div>
				<div>Captial</div>
				<div>
					Cybernetics
					<ul class="aug-list">
						{#if character.cybernetics}
							{#each character.cybernetics.data as ability}
								<li class="small-menu-item" data-augmented-ui>
									<a href="#{ability.attributes.slug}"> {ability.attributes.name}</a>
								</li>
							{/each}
						{/if}
					</ul>
				</div>

				<div class="items">Items</div>
				<div class="abilities">
					Abilities
					<ul>
						{#if character.selectedAbilities}
							{#each character.selectedAbilities.data as ability}
								<li class="small-menu-item" data-augmented-ui>
									<a href="#{ability.attributes.slug}"> {ability.attributes.name}</a>
								</li>
							{/each}
						{/if}
					</ul>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.character-container {
		overflow-y: auto;
	}
</style>
