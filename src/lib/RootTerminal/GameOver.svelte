<script>
    import { gameState } from "./model/Game";
    let winner = $gameState.player;

    if($gameState.player.hitPoints <= 0 && $gameState.opponent.hitPoints > 0){
        winner = $gameState.opponent;
    }

  </script>

<div class="game-over">
    <h2>{winner.name} wins!</h2>
    <div class="button-container">
    <button data-augmented-ui class="aug-button" on:click={() => gameState.restart()}>Restart</button>
    <button data-augmented-ui class="aug-button" on:click={() => gameState.startNewGame()}>New Game</button>

    </div>
</div>

<style>
    .game-over {
        text-align: center;
        margin-top: 50px;
    }
    h2 {
        font-size: 3rem;
        margin-bottom: 20px;
    }
    .button-container{
        display: grid;
        grid-auto-flow: column;
        gap: 3rem;
    }
    button {
        font-size: 1.5rem; 
        padding: .5rem 1rem;
    }
</style>
