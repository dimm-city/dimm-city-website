<script>
    export let options = [];
    export let selected = null;
    
    let isOpen = false;
    
    function toggleDropdown() {
      isOpen = !isOpen;
    }
    
    function handleClick(option) {
      selected = option;
      isOpen = false;
    }
  </script>
  
  <style>
    .hexagon-btn {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 45px;
      background-color: #4CAF50;
      color: white;
      font-size: 16px;
      text-align: center;
      line-height: 45px;
      border-radius: 5px;
      cursor: pointer;
    }
    
    .hexagon {
      position: absolute;
      top: -30px;
      left: -5px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 180px;
      height: 180px;
      z-index: 10000;
    }
    
    .hexagon-item {
      position: relative;
      width: 50px;
      height: 50px;
      margin: 5px;
      background-color: #FFC107;
      color: white;
      font-size: 16px;
      text-align: center;
      line-height: 50px;
      border-radius: 5px;
      cursor: pointer;
      transform: rotate(30deg);
      z-index: 10000;
    }
    
    .hexagon-item:before {
      content: "";
      position: absolute;
      top: -25px;
      left: -25px;
      width: 0;
      height: 0;
      border-top: 25px solid transparent;
      border-bottom: 25px solid transparent;
      border-right: 25px solid #FFC107;
      transform: rotate(-30deg);
      z-index: 10000;
    }
    
    .hexagon-item:after {
      content: "";
      position: absolute;
      bottom: -25px;
      left: -25px;
      width: 0;
      height: 0;
      border-top: 25px solid transparent;
      border-bottom: 25px solid transparent;
      border-left: 25px solid #FFC107;
      transform: rotate(-30deg);
      z-index: 10000;
    }
    
    .selected {
      background-color: #2196F3;
    }
  </style>
  
  <div class="hexagon-btn" on:click={toggleDropdown}>
    {#if selected}
      {selected}
    {:else}
      Select an option
    {/if}
    
    {#if isOpen}
      <div class="hexagon">
        {#each options as option}
          <div class="hexagon-item {selected === option ? 'selected' : ''}" on:click={() => handleClick(option)}>
            {option}
          </div>
        {/each}
      </div>
    {/if}
  </div>
  