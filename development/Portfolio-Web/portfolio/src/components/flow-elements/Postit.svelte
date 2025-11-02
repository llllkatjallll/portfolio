<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  
  let { data }: NodeProps = $props();


  const defaultColor = '#a77bca'; 
  const colors = [
    { name: 'yellow', hex: '#ffc' },
    { name: 'pink', hex: '#fbc' },
    { name: 'green', hex: '#cfc' },
    { name: 'blue', hex: '#ccf' },
    { name: 'orange', hex: '#fca' },
  ];

  // i get current color as name "green" "pink" and so on. find the correct hex based on colors array.
  let currentColor = colors.find(c => c.name === data.color)?.hex || defaultColor;


</script>

<div class="postit-node" style="background-color: {currentColor};">
  <Handle type="target" position={Position.Left} />
  
  <div class="postit-content">
    <p>{data.text}</p>
  </div>


  <Handle type="source" position={Position.Right} />
</div>

<style>
  .postit-node {
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    font-family: 'Handlee', cursive; /* Optional: for a handwritten feel */
    min-width: 200px;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Optional: Google Font for a post-it look */
  @import url('https://fonts.googleapis.com/css2?family=Handlee&display=swap');

  .postit-content {
    flex-grow: 1; /* Allows the textarea to take available space */
  }

  .postit-node textarea {
    width: 100%;
    height: 100%; /* Fill parent container */
    border: none;
    background: transparent;
    resize: none;
    font-size: 1.1em;
    padding: 0;
    margin: 0;
    font-family: inherit; /* Use Handlee if available */
    color: #333;
  }
  .postit-node textarea:focus {
    outline: none;
  }

  .color-picker {
    display: flex;
    gap: 5px;
    margin-top: 10px;
    justify-content: center;
  }

  .color-swatch {
    width: 20px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
  }

  .color-swatch:hover {
    transform: scale(1.1);
  }

  .color-swatch.selected {
    border: 2px solid #333; /* Highlight selected color */
    box-shadow: 0 0 0 2px white, 0 0 0 4px #333;
  }

  /* Handle styling (optional, Svelte Flow handles default) */
  .svelte-flow__handle {
    background: #555;
    width: 8px;
    height: 8px;
  }
</style>