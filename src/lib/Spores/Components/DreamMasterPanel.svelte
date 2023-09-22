<script>

	/**
	 * @type {DC.Spore}
	 */
	 export let spore;
</script>

<div class="panel inside-right" data-augmented-ui>
	<div class="container">
		<h1>Dream Master</h1>
		<p>
			As the <strong>Dream Master</strong>, your only job is to introduce the scenario and find out how the players
			survive it. Hint at what their sporos observes from a distance, then up close if they choose to investigate.
			Rarely spring unavoidable traps and always try to give them info that will let them piece together the danger they
			are facing and then ask them what they plan to do. “The AI rocks up noisily in its mechanized battlebody. It
			ejects its scimitars from their housings and stands poised to strike nearby. What do you do?”
		</p>
		<p>
			Talking with NPCs (non-player characters) should always be an option for the dreamers. Not every minion nor
			villain wants to fight. In many cases, anticipated combat can be avoided altogether with fleet feet and a smooth
			tongue. Always encourage and allow for the Dreamers to communicate with anything inside the dream.
		</p>
		<p>
			Call for a roll when the situation is risky. Use failures to enhance the story instead of stopping it. Completely
			crapping out in an intense moment can sometimes be more memorable and enjoyable than success in some cases.
			Regardless, the story should change for better or worse as a result of a roll. Ask questions of each other and
			build a fun story based on the answers you come up with together.
		</p>
		<div class="table">
			<h3>Plot Twist</h3>
			<div>
				Use the table below to select an additional challenge for the group to contend with. Roll a die, pick one you
				like, or make up your own! Decide how and when you want to let the party know about the plot twist.
			</div>
			<ol data-update>
				{#each spore.attributes.twists as item}
					<li>{item.value}</li>
				{/each}
			</ol>
		</div>
	</div>
</div>
