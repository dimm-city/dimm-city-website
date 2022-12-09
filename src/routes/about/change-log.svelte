<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
</script>

<Shell title="Change Log">
	<ContentPane>
		<h4 class="">Dimm City Console v0.4.0</h4>
		<ul class="unstyled-list">
			<li><a href="/journal-entries">Journal entries data added</a></li>
			<li><a href="/">Navigation improved</a></li>
			<li><a href="/citizens">Citizens are now searchable</a></li>
			<li><a href="/specialties">Specialties are now searchable</a></li>
		</ul>
		<h4 class="">Dimm City Console v0.3.0</h4>
		<ul class="unstyled-list">
			<li><a href="/locations">Location data added</a></li>
			<li><a href="/specialties">Initial specialty data extracted</a></li>
		</ul>
		<h4 class="">Dimm City Console v0.2.0</h4>
		<ul class="unstyled-list">
			<li><a href="/console">Op Console</a></li>
			<li><a href="/console">Sporo Data Recorder</a></li>
			<li><a href="/citizens">Additional Citizen Data</a></li>
			<li><a href="/history/prologue-scene-2">More Historical Data Extracted</a></li>
		</ul>
		<div style="height: 1rem;" />
		<h4 class="">Dimm City Console v0.1.0</h4>
		<ul class="unstyled-list">
			<li>
				<a href="/history/prologue-scene-1">Connection established...</a>
			</li>
			<li><a href="/citizens">Initial citizen data extracted</a></li>
			<li>
				<a href="/history/introduction">Dimm City Introduction record extracted</a>
			</li>
		</ul>
	</ContentPane>
</Shell>
