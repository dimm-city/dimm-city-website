<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { config } from '$lib/Shared/config';
	import Shell from '$lib/Components/Shell.svelte';
	import Image from '$lib/Components/Image.svelte';
	import MainMenu from '$lib/Components/Menu/MainMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import TextContainer from '$lib/Components/TextContainer.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
</script>

<style>
	.spore-container h3 {
		margin-bottom: 0rem;
	}
	.spore-container small {
		font-size: 0.75rem;
		display: block;
		margin-bottom: 1rem;
	}
	.spore-container {
		height: min-content;
		width: 100%;
		padding-inline: 2rem;
	}

	:global(.spore-container .menu-item) {
		padding-inline: 0;
	}
	.item-container {
		display: grid;
		grid-auto-flow: column;
		width: 100%;
		font-size: 0.75rem;
		padding: 0.25rem;
	}
	:global(.item-container:nth-child(odd)) {
		justify-content: left;
	}
	.item-container .content {
		align-items: center;
		display: flex;
		padding: 0.5rem;
	}
</style>

<Shell title="Spores">
	<ContentPane padding={0}>
		<div class="spore-container animate__animated animate__backInDown">
			<h3 class="">Dimm City Spores</h3>
			<small>&lt;The Dimm City 1-Page RPG&gt;</small>
			<TextContainer>
				<div class="fade-in">
					<p>
						A Dimm City Spore is a rules light (Lasers & Feelings homebrew) introduction to the Dimm City Campaign
						Setting/WEB3 Character Evolution for use with the rules heavy Quest RPG System.
					</p>
					<p>
						In a Dimm City Spore, Dreamers (players) take on the role of a sporos hero doing good deeds in a bad place
						using magic, technology, combat, and their own wits to succeed. Dream Masters (the judge and storyteller)
						provide environmental descriptions, atmosphere, challenges, and opponents along with the plot to drive the
						Dream (shared story) forward. The Dream Master is not an enemy of the Dreamers, but a guide into Dimm City
						and all the action, adventure, and secrets it holds. Dreamers and the DM work together to create a story
						that is both exciting and unforgettable.
					</p>
					<p>
						To download a copy of a spore, click one of the menu items below. 
						Use the <a href="/">DCC</a> to learn more about Dimm City and it's citizens.
					</p>

					<p>
						We hope you enjoy your journey,
						<br />-the founders
					</p>
				</div>
			</TextContainer>
			<Menu columns={2}>
				<MenuItem
				url="https://files.dimm.city/spores/the-dark.pdf"
					icon="bi-map"
					title="The Dark"
					description="Districts and locations identified within Dimm City"
				>
					<div class="item-container">
						<Image
							height="100%"
							width="135px"
							imageUrl="https://files.dimm.city/assets/locations/the-dark-thumbnail.png"
							title="The Dark"
							videoUrl=""
							aug=""
						/>
						<div class="content">
							To view The Dark from above is to see a spiral of main city streets intersected by anarchy on the
							outskirts and moderate uniformity as one gets closer to the bottom. I say, “you would see” because the
							skyscrapers filled center of this part of Dimm City is pitched black to the naked eye.
						</div>
					</div>
				</MenuItem>
				<!-- <MenuItem
					url="https://files.dimm.city/spores/the-dark.pdf"
					target="_blank"
					icon="bi-map"
					title="The Dark"
					description="Districts and locations identified within Dimm City"
				>
					<div class="item-container">
						<Image
							height="100%"
							width="135px"
							imageUrl="https://files.dimm.city/assets/locations/the-dark-thumbnail.png"
							title="The Dark"
							videoUrl=""
							aug=""
						/>
						<div class="content" />
					</div>
				</MenuItem> -->
			</Menu>
		</div>
	</ContentPane>
	<MainMenu slot="menu" />
</Shell>
