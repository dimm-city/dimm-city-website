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
</script>

<style>
	.home-container {
		height: min-content;
		width: 100%;
	}
	:global(.home-menu-item) {
		width: 300px;
	}
	:global(.home-container > div) {
		width: 100%;
	}
</style>

<Shell title="Home" showMenuButton={true} showMainMenuButton={false}>
	<ContentPane>
		<div class="home-container animate__animated animate__backInDown">
			<h3 class="">Dimm City Console v{config.version}</h3>
			<TextContainer>
				<p>Hello Op, we are glad you came.</p>
				<p>
					The console is online, but barely. We have only managed to scavage a few pieces of data from the Ether so far.
					We need all the help we can get! Please contribute any information you can provide regarding the citizens of
					Dimm City.
				</p>
				<p>
					If you have successfully connected to a Sporo, you should be able to access that connection from the Op
					Console. This console will allow you to complete a citizen profile for the Sporo you are connected to. That
					profile will be saved to into the console for other Ops to reference.
				</p>
				<p>
					We remain hopeful that, with enough information, there still may be a chance... Your assistance in greatly
					appreciated,
					<br />-founder3
				</p>
			</TextContainer>
			<Menu columns={3}>
				<MenuItem
					url="/console"
					icon="bi-person-workspace"
					title="Op Console"
					description="Connect to your Operator's Console"
				/>
				<MenuItem
					url="/citizens"
					icon="bi-people"
					title="Citizen Files"
					description="Access the available citizen files"
				/>

				<MenuItem icon="bi bi-journals" title="Historical Records" url="/history" description="History of Dimm City" />

				<MenuItem url="/console/man" icon="bi-info-circle" title="Op Manual" description="Operator's Console Manual" />
				<MenuItem
					url="/console/change-log"
					icon="bi-journal-check"
					title="Change Log"
					description="Latest changes to Dimm City Console"
				/>
				<MenuItem
					url="/console/stats"
					icon="bi-diagram-3"
					title="System Stats"
					description="Console information and diagnostics"
				/>
			</Menu>
		</div>
	</ContentPane>
	<MainMenu slot="menu" />
</Shell>
