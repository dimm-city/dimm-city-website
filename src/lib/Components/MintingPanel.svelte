<script>
    import { numberOfTokensToMint, showModalFullscreen } from "./store.js";
    import { mint } from "./service";
    import NeonButton from "../Shared/NeonButton.svelte";

    $showModalFullscreen = false;
    let maxTokens = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let openPackAutomatically = true;
    let data_augmented_ui = "tl-2-clip-y t-clip-x tr-2-clip-y r-clip-y br-2-clip-y b-clip-x bl-2-clip-y l-clip-y both";
</script>

<div class="minting-panel">
    <div class="panel">
        <div class="panel-header">Generate Sporo Rabbits</div>
        <div class="panel-body">
            <div class="grid-container">
                {#each maxTokens as token}
                    <div
                        class="grid-item neon-keypad"
                        class:selected={$numberOfTokensToMint == token}
                        on:click={() => ($numberOfTokensToMint = token)}
                    >
                        {token}
                    </div>
                {/each}
                <div class="grid-item neon-keypad centered" on:click={() => ($numberOfTokensToMint = 10)}>10</div>
            </div>
        </div>
        <div class="panel-footer text-muted">
            <div class="d-block pb-3">
                <div
                    class="neon-keypad centered align-self-end"
                    class:selected={openPackAutomatically}
                    class:reversed={!openPackAutomatically}
                    on:click={() => (openPackAutomatically = !openPackAutomatically)}
                >
                  
                        <i class="far fa-square p-2" 
                          class:fa-check-square={openPackAutomatically}
                          class:fa-square={!openPackAutomatically}/><span>Open automatically</span>
                  
                </div>
            </div>
            <div class="d-block mt-3">
                <NeonButton on:click={() => mint($numberOfTokensToMint, openPackAutomatically)}>
                    <div class="p-1 text-center">Mint ({$numberOfTokensToMint})</div></NeonButton
                >
            </div>
        </div>
    </div>
</div>

<style>
    .minting-panel {
        min-width: 30vw;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        background-color: transparent;
        padding: 1em;
        max-width: max-content;
    }
    .grid-item {
        grid-column: span 2;
    }

    .grid-item.centered {
        /* (1):nth-child(odd) { */
        grid-column: 3 / span 2;
    }
    .panel {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: transparent;
        background-clip: border-box;
    }

    .panel-header {
        padding: 0.5rem 1rem;
        margin-bottom: 0;
        color: var(--third-accent);
        display: flex;
        justify-content: center;
        align-content: center;
        /* background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125); */
    }
    .panel-body {
        flex: 1 1 auto;
        padding: 1rem 1rem;
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .panel-footer {
        padding: 0.5rem 1rem;
        display: block;
        justify-content: center;
        align-content: center;
        /* background-color: rgba(0, 0, 0, 0.03);
    border-top: 1px solid rgba(0, 0, 0, 0.125); */
    }

    .neon-keypad {
        color: var(--primary-accent);
        border: thin solid var(--third-accent);
        cursor: pointer;
        transition: 0.2s;
        padding: 1em;
        margin: 0.5em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .neon-keypad:hover,
    .neon-keypad:active,
    .neon-keypad.selected {
        box-shadow: 0 0.02em 0em 0 var(--third-accent) inset, 0 0.02em 0em 0 var(--third-accent),
            0 0.02em 1em 0 var(--third-accent) inset, 0 0.02em 1em 0 var(--third-accent);
        text-shadow: 0 0 0.2em var(--primary-accent);
    }
</style>
