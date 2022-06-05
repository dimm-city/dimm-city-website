<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { config } from '$lib/config';
	import Shell from '$lib/Shell.svelte';
	import MainMenu from '$lib/Components/Menu/MainMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { showMenu } from '$lib/ShellStore';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import TextContainer from '$lib/Components/TextContainer.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	$showMenu = false;

	let currentText = 'op-console';
	function updateText(key: string) {
		currentText = key == ''? 'op-console' : key;
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
			<h6 class="">Dimm City Console v{config.version}</h6>

			<Menu columns={3}>
				<MenuItem
					on:mouseenter={() => updateText('op-console')}
					on:mouseleave={() => updateText('')}
					url="/console"
					icon="bi-person-workspace"
					title="Op Console"
					description="Connect to your Operator's Console"
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
				<MenuItem
					on:mouseenter={() => updateText('change-log')}
					on:mouseleave={() => updateText('')}
					url="/console/change-log"
					icon="bi-journal-check"
					title="Change Log"
					description="Latest changes to Dimm City Console"
				/>
				<MenuItem
					on:mouseenter={() => updateText('stats')}
					on:mouseleave={() => updateText('')}
					url="/console/stats"
					icon="bi-diagram-3"
					title="System Stats"
					description="Console information and diagnostics"
				/>
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
				{:else if currentText == 'manual'}
					<div class="fade-in">
						<h4>Op Manual</h4>
						<p />
					</div>
				{:else if currentText == 'change-log'}
					<div class="fade-in">
						<h4>Change Log</h4>
						<p>
							Read up on the latest changes to the console. As we make improvements, we will list them here for quick
							reference. This is an easy way to see if any new tools have been added or bugs have been fixed in the
							latest release.
						</p>
					</div>
				{:else if currentText == 'stats'}
					<div class="fade-in">
						<h4>System Stats</h4>
						<blockquote>"Metrics are important, diagnostics are divine." -founder3</blockquote>
						<p>
							The console has a varity of connections, subsystems, and cron jobs that it needs to keep things running.
							This area of the console takes a look under the hood to see what's going on.
						</p>
						<p>
							More important than either metrics or diagnostics is community and open collaboration. This area also
							highlights technologies, projects, and contributions that make the console possible. Without the people
							behind these resources the exploration of Dimm City would not be possible.
						</p>
					</div>
				{:else if currentText == 'op-console'}
					<div class="fade-in">
						<p>Hello Op, we are glad you came.</p>
						<p>
							The console is online, but barely. We have only managed to scavage a few pieces of data from the Ether so
							far. We need all the help we can get! Please contribute any information you can provide regarding the
							citizens of Dimm City.
						</p>
						<p>
							If you have successfully connected to a Sporo, you should be able to access that connection from the Op
							Console. This console will allow you to complete a citizen profile for the Sporo you are connected to.
							That profile will be saved to into the console for other Ops to reference.
						</p>
						<p>We remain hopeful that, with enough information, there still may be a chance...</p>
						<p>
							Your assistance in greatly appreciated,
							<br />-founder3
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
