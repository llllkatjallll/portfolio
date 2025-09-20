<script lang="ts">
    import NeedleEngine from "./NeedleEngine.svelte";
    import {CurrentState, AppState} from "tsne.npm/StateManager";
    
    // Add state for info panel visibility
    let isInfoPanelVisible = true;
    
    // Function to toggle info panel visibility
    function toggleInfoPanel() {
        isInfoPanelVisible = !isInfoPanelVisible;
    }
</script>

<NeedleEngine></NeedleEngine>

<div class="InfoPanel" class:collapsed={!isInfoPanelVisible} style="position: absolute; top: 10px; left: 10px; z-index: 10; background-color: rgba(255, 255, 255, 0.8); padding: 10px; border-radius: 8px;">
    <div class="info-header">
        <h1>t-SNE Visualization</h1>
        <button class="toggle-button" on:click={toggleInfoPanel}>
            {isInfoPanelVisible ? '−' : '+'}
        </button>
    </div>
    
    {#if isInfoPanelVisible}
        <div class="info-content">
            <p>This application visualizes high-dimensional data using t-SNE in both 2D and 3D modes.</p>
            <p>Use the buttons below to switch between 2D and 3D views.</p>

            made  by Katja Rempel
        </div>
    {/if}
</div>

<div class="control-panel">
    <button on:click={() => $CurrentState = AppState.TwoD}>
        2D
    </button>

    <button on:click={() => $CurrentState = AppState.ThreeD}>
        3D
    </button>
</div>


<style>

    .InfoPanel {
        position: absolute;
        top: 10px;
        left: 10px;
        min-width: 400px;
        z-index: 10;
        transition: all 0.3s ease-in-out;
        max-width: 350px;
        overflow: hidden;
    }
    
    .InfoPanel.collapsed {
        max-width: 200px;
    }
    
    .info-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .info-content {
        animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .toggle-button {
        background: transparent;
        color: black;
        border: 1px solid #ccc;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        min-height: 24px;
        padding: 0;
        font-size: 18px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    
    .toggle-button:hover {
        background-color: #eee;
    }

    .control-panel {
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 10;
    }



h1
{
  color: rgb(0, 0, 0);
  font-family: "Farfetch Basis","Helvetica Neue",Arial,sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0 0 10px;
  text-align: left;
}

/* CSS */
button {
  background-color: #222;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Farfetch Basis","Helvetica Neue",Arial,sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  max-width: none;
  min-height: 44px;
  min-width: 10px;
  outline: none;
  overflow: hidden;
  padding: 9px 20px 8px;
  position: relative;
  text-align: center;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}


button:hover,
button:focus {
  opacity: .75;
}
</style>
