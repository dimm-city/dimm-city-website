<script>
	import Menu from '../Shared/Components/Menu/Menu.svelte';
	import MenuItem from '../Shared/Components/Menu/MenuItem.svelte';
	import { searchText } from '../Shared/Stores/ShellStore';
</script>

<h4>Searching for: {$searchText}</h4>
<Menu columns={3}>
	<MenuItem
		icon="bi bi-journal-code"
		title="Founder Journals"
		url="/journal-entries"
		description="Files from the founder's journals"
	/>

	<MenuItem
		url="/locations"
		icon="bi-map"
		title="Locations"
		description="Districts and locations identified within Dimm City"
	/>
	<MenuItem url="/citizens" icon="bi-people" title="Citizen Files" description="Access the available citizen files" />
	<MenuItem
		url="/specialties"
		icon="bi-code"
		title="Specialties"
		description="Documenting the true skills of the Sporos"
	/>

	<MenuItem icon="bi bi-journals" title="Historical Records" url="/history" description="History of Dimm City" />

	<!-- <MenuItem
					on:mouseenter={() => updateText('manual')}
					on:mouseleave={() => updateText('')}
					url="/console/man"
					icon="bi-info-circle"
					title="Op Manual"
					description="Operator's Console Manual"
				/> -->
	<MenuItem
		url="/console"
		icon="bi-person-workspace"
		title="Op Console"
		description="Connect to your Operator's Console"
	/>

	<MenuItem
		url="/about/change-log"
		icon="bi-journal-check"
		title="Change Log"
		description="Latest changes to Dimm City Console"
	/>
	<MenuItem
		url="/about/stats"
		icon="bi-diagram-3"
		title="System Stats"
		description="Console information and diagnostics"
	/>
</Menu>
