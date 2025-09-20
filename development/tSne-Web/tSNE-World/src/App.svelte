<script lang="ts">
    import NeedleEngine from "./NeedleEngine.svelte";
    import {CurrentState, AppState} from "tsne.npm/StateManager";
</script>

<NeedleEngine></NeedleEngine>

<div>
    <button on:click={() => $CurrentState = AppState.TwoD}>
        2D
    </button>

    <button on:click={() => $CurrentState = AppState.ThreeD}>
        3D
    </button>
</div>


<style>

    div {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 10;
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
