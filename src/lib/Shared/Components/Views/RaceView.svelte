<script>
    
    /** @type {DC.Race}*/
    export let race;
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

    @media (max-width: 600px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>

<div class="grid">
    <div>
        <h2>{race.attributes.name}</h2>
        <p><strong>HP:</strong> {race.attributes.hp}</p>
        <p><strong>ATK:</strong> {race.attributes.atk}</p>
        <p><strong>Playable:</strong> {race.attributes.playable ? 'Yes' : 'No'}</p>
        <p><strong>Occupations:</strong> {race.attributes.occupations}</p>
    </div>
    <div>
        <h3>Appearance</h3>
        <p>{race.attributes.appearance}</p>
    </div>
    <div>
        <h3>Short Description</h3>
        <p>{race.attributes.shortDescription}</p>
    </div>
    <div>
        <h3>Description</h3>
        <p>{race.attributes.description}</p>
    </div>
    <div>
        <h3>Ideals</h3>
        <p>{race.attributes.ideals}</p>
    </div>
    <div>
        <h3>Flaws</h3>
        <p>{race.attributes.flaws}</p>
    </div>
    <div>
        <h3>Desires</h3>
        <p>{race.attributes.desires}</p>
    </div>
    <div>
        <h3>Problems</h3>
        <p>{race.attributes.problems}</p>
    </div>
</div>
