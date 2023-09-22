<script>	
	/**
	 * @type {DC.Spore}
	 */
	 export let spore;
</script>

<style>
	ul {
		list-style-type: '> ';
	}
</style>

<div class="panel inside-fold" data-augmented-ui>
	<div class="container">
		<h1>Dream Guide</h1>
		<p>Roll or choose from the tables below to setup the scenario for the dream:</p>
		<div class="table" data-update>
			<h3>A powerful...</h3>
			<ol>
				{#each spore.attributes.villains as item}
					<li>{item.value}</li>
				{/each}
			</ol>
		</div>
		<div class="table" data-update>
			<h3>Has executed their plan to...</h3>
			<ol>
				{#each spore.attributes.plots as item}
					<li>{item.value}</li>
				{/each}
			</ol>
		</div>
		<div class="table">
			<h3>What will your sporos do?!</h3>
			<p>
				As a group, decide how you will respond to the scenario that is unfolding. Do you attempt to thwart the evil
				plan or join in the mayhem to gain a bit of the power for yourselves?
			</p>
			<p>
				<strong>DM Note:</strong> encourage creativity and different ways of overcoming the situation. Have fun guiding them
				through what you planned, but be flexible enough to incorporate their ideas into collective story you are creating
				together. Here are some ideas to use depending on the scenario selected above:
			</p>
			<ul data-update>
				{#each spore.attributes.goals as item}
					<li>{item.value}</li>
				{/each}
			</ul>
			<hr class="print-only"/>
			<h1 class="print-only">
				<small>for more rules, lore, and misc. debris<br /></small>
				goto: dimm.city/spores
			</h1>
		</div>
	</div>
</div>
