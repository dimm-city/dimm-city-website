<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import FlexMenu from '$lib/Shared/Components/Menu/FlexMenu.svelte';
	import { getSpores } from './Queries/getSpores';
	/**
	 * @type {import("../Shared/Models/ISummaryItem").ISummaryItem[]}
	 */
	let spores;
	getSpores().then((s) => (spores = s));
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
	}

</style>

<Shell title="Spores">
	<ContentPane>
		<div class="spore-container">
			<h3 class="">Dimm City Spores</h3>
			<small>&lt;The Dimm City 1-Page RPG&gt;</small>

			<div class="fade-in">
				<p>
					A Dimm City Spore is a rules light (Lasers & Feelings homebrew) introduction to the Dimm City Campaign
					Setting/WEB3 Character Evolution for use with the rules heavy Quest RPG System.
				</p>
				<p>
					In a Dimm City Spore, Dreamers (players) take on the role of a sporos hero doing good deeds in a bad place
					using magic, technology, combat, and their own wits to succeed. Dream Masters (the judge and storyteller)
					provide environmental descriptions, atmosphere, challenges, and opponents along with the plot to drive the
					Dream (shared story) forward. The Dream Master is not an enemy of the Dreamers, but a guide into Dimm City and
					all the action, adventure, and secrets it holds. Dreamers and the DM work together to create a story that is
					both exciting and unforgettable.
				</p>
				<p>
					To download a copy of a spore, click one of the menu items below. Use the <a href="/">DCC</a> to learn more about
					Dimm City and it's citizens.
				</p>

				<p>
					We hope you enjoy your journey,
					<br />-the founders
				</p>
			</div>

			<FlexMenu data={spores} icon="bi-map" />
		</div>
	</ContentPane>
</Shell>
