<script>
    
    export let race = {
        // Assuming you have a race object with the necessary properties
    };
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
        <h2>{race.name}</h2>
        <p><strong>HP:</strong> {race.hp}</p>
        <p><strong>ATK:</strong> {race.atk}</p>
        <p><strong>Playable:</strong> {race.playable ? 'Yes' : 'No'}</p>
        <p><strong>Occupations:</strong> {race.occupations}</p>
    </div>
    <div>
        <h3>Appearance</h3>
        <p>{race.appearance}</p>
    </div>
    <div>
        <h3>Short Description</h3>
        <p>{race.shortDescription}</p>
    </div>
    <div>
        <h3>Description</h3>
        <p>{race.description}</p>
    </div>
    <div>
        <h3>Ideals</h3>
        <p>{race.ideals}</p>
    </div>
    <div>
        <h3>Flaws</h3>
        <p>{race.flaws}</p>
    </div>
    <div>
        <h3>Desires</h3>
        <p>{race.desires}</p>
    </div>
    <div>
        <h3>Problems</h3>
        <p>{race.problems}</p>
    </div>
</div>
