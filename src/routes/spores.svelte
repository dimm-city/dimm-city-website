<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { config } from '$lib/Shared/config';
	import Shell from '$lib/Components/Shell.svelte';
	import MainMenu from '$lib/Components/Menu/MainMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import TextContainer from '$lib/Components/TextContainer.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	$showMenu = false;

	let currentText = 'spores';
	function updateText(key: string) {
		currentText = key == '' ? 'spores' : key;
	}
</script>

<style>
	.home-container {
		height: min-content;
		width: 100%;
		padding-inline: 2rem;
	}
	:global(.home-menu-item) {
		width: 300px;
	}
	:global(.home-container > div) {
		width: 100%;
	}
</style>

<Shell title="Home" showMenuButton={true} showMainMenuButton={false}>
	<ContentPane padding={0}>
		<div class="home-container animate__animated animate__backInDown">
			<h3 class="">Dimm City Spores</h3>
			<small>Welcome to the Dimm City 1-Page RPG</small>

			<Menu columns={2}>
				<!-- <MenuItem
					on:mouseenter={() => updateText('spores')}
					on:mouseleave={() => updateText('')}
					url="/spores"
					icon="bi-pin"
					title="Dimm City Spores"
					description="Welcome to the Dimm City 1-Page RPG"
				/> -->
				<MenuItem
					on:mouseenter={() => updateText('locations')}
					on:mouseleave={() => updateText('')}
					url="/locations"
					icon="bi-map"
					title="Locations"
					description="Districts and locations identified within Dimm City"
				/>
				<MenuItem
					on:mouseenter={() => updateText('specialties')}
					on:mouseleave={() => updateText('')}
					url="/specialties"
					icon="bi-code"
					title="Specialties"
					description="Documenting the true skills of the Sporos"
				/>

				<MenuItem
					on:mouseenter={() => updateText('citizens')}
					on:mouseleave={() => updateText('')}
					url="/citizens"
					icon="bi-people"
					title="Citizen Files"
					description="Access the available citizen files"
				/>
				<MenuItem
					on:mouseenter={() => updateText('history')}
					on:mouseleave={() => updateText('')}
					icon="bi bi-journals"
					title="Historical Records"
					url="/history"
					description="History of Dimm City"
				/>

				<!-- <MenuItem
					on:mouseenter={() => updateText('manual')}
					on:mouseleave={() => updateText('')}
					url="/console/man"
					icon="bi-info-circle"
					title="Op Manual"
					description="Operator's Console Manual"
				/> -->
			</Menu>
			<TextContainer>
				{#if currentText == 'citizens'}
					<div class="fade-in">
						<h4>Citizens</h4>
						<p>
							The work to gather citizen profiles is on-going. Here you can find the information we have been able to
							recover so far. If you have a connection to a Sporo, you can help the cause by filling in a citizen
							profile. Your help is greatly appreicated. Please consider providing a profile for any Sporo you establish
							a connection with.
						</p>
					</div>
				{:else if currentText == 'history'}
					<div class="fade-in">
						<h4>Historical Records</h4>
						<p>
							As pieces of the Dimm City story are discovered they are documented here. So far, this is only a few
							fragments of data. Honestly, we are not entirely sure how, or if, they are connected. Our ability to
							recover this data from the Ether is improving each day, but is still very much lacking. So, for now, we
							manage with what we have.
						</p>
					</div>
				{:else if currentText == 'specialties'}
					<div class="fade-in">
						<h4>Specialties</h4>
						<p>
							It has become clear that there are some exceptional Sporos that operate on a level beyond that of the
							average citizen. These Sporos specialize in a variety of skills. Some harness there power from technology
							and others direct from the Ether.
						</p>
					</div>
				{:else if currentText == 'locations'}
					<div class="fade-in">
						<h4>Locations</h4>
						<p>
							We have begun the process of identifying locations within the city. Here you can access the notes we have
							put together based on what we know so far.
						</p>
					</div>
				{:else if currentText == 'spores'}
					<div class="fade-in">
						<p>Welcome Dream Master</p>
						<p>Thank you for following the note on the mushroom and finding your way here.</p>
						<p>
							The sections show above will allow you to find more information about Dimm City and what life is like for
							it's citizens, the Sporos.
						</p>
						<p>To download a copy of a spore, open that districts Location file and click the download button.</p>
						<p>
							We hope you enjoy your journey,
							<br />-the founders
						</p>
					</div>
				{:else}
					<div class="fade-in">&nbsp;</div>
				{/if}
			</TextContainer>
		</div>
	</ContentPane>
	<MainMenu slot="menu" />
</Shell>
