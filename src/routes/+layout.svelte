<script>
	import Alert from "$lib/Shared/Shell/Alert.svelte";
	import Notifications from "svelte-notifications";
</script>
<Notifications item={Alert} zIndex={1000000}>
    <slot></slot>
</Notifications>