<script>
  let character = {
    name: '',
    class: '',
    level: '',
    race: '',
    alignment: '',
    background: ''
  };
</script>

<style>
  .profile-editor {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 600px) {
    .profile-editor {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="profile-editor">
  <div>
    <label for="name">Name</label>
    <input id="name" bind:value={character.name} />
  </div>
  <div>
    <label for="class">Class</label>
    <input id="class" bind:value={character.class} />
  </div>
  <div>
    <label for="level">Level</label>
    <input id="level" bind:value={character.level} />
  </div>
  <div>
    <label for="race">Race</label>
    <input id="race" bind:value={character.race} />
  </div>
  <div>
    <label for="alignment">Alignment</label>
    <input id="alignment" bind:value={character.alignment} />
  </div>
  <div>
    <label for="background">Background</label>
    <input id="background" bind:value={character.background} />
  </div>
</div>
