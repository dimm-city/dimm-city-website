<script>
	import Menu from './Menu.svelte';
	import MenuItem from './MenuItem.svelte';
</script>

<Menu>
	<MenuItem icon="bi bi-world" title="Home" url="/">Console home page</MenuItem>
	<MenuItem icon="bi bi-journals" title="History" url="/history">History of Dimm City</MenuItem>
	<MenuItem icon="bi bi-people" title="Sporos" url="/">Explore the Sporos that have been located</MenuItem>
	<MenuItem icon="bi bi-journals" title="Archives" url="/history" />
</Menu>
