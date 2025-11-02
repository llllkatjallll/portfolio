<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  
  let { data }: NodeProps = $props();


  const defaultColor = '#e7c6ff'; 
  const colors = [
    { name: 'yellow', hex: '#ffd670' },
    { name: 'pink', hex: '#ff70a6' },
    { name: 'green', hex: '#e9ff70' },
    { name: 'blue', hex: '#70d6ff' },
    { name: 'orange', hex: '#ff9770' },
    { name: 'purple', hex: '#9fa0ff' },
  ];

  let currentColor = colors.find(c => c.name === data.color)?.hex || defaultColor;

  function darkenColor(hex: string, percent: number) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    const factor = 1 - percent / 100;
    r = Math.max(0, Math.floor(r * factor));
    g = Math.max(0, Math.floor(g * factor));
    b = Math.max(0, Math.floor(b * factor));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  let darkerCurrentColor = darkenColor(currentColor, 15);

</script>

<div class="postit-node" style="--postit-color: {currentColor}; --postit-color-dark: {darkerCurrentColor};">
<!--   <Handle type="target" position={Position.Left} /> -->
  
  <div class="postit-content">
    <p>{data.text}</p>
  </div>


<!--   <Handle type="source" position={Position.Right} /> -->
</div>

<style>
  .postit-node {
    background: var(--postit-color);
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    font-family: 'Handlee', cursive; /* Optional: for a handwritten feel */
    min-width: 200px;
    min-height: 150px;
    position: relative;
  }

  .postit-node:after {
    content: "";
    position: absolute;
    bottom: -2em;
    left: 0;
    right: 2em;
    border-width: 1.2em;
    border-style: solid;
    border-color: var(--postit-color);
  }

  .postit-node:before {
    content: "";
    position: absolute;
    bottom: -2em;
    right: 0;
    border-width: 2em 2em 0 0;
    border-style: solid;
    border-color: var(--postit-color-dark) transparent;
  }

  /* Optional: Google Font for a post-it look */
  @import url('https://fonts.googleapis.com/css2?family=Handlee&display=swap');

  .postit-content {
    flex-grow: 1; /* Allows the textarea to take available space */
  }


</style>