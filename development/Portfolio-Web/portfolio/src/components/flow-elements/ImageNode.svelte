<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  
  let { data }: NodeProps = $props(); 


</script>

<div class="image-node">
  <img src={data.imageUrl}  />
  
  <Handle type="target" position={Position.Left} />
  <Handle type="source" position={Position.Right} />
</div>

<style>
  .image-node {
    /* Basic styling for the node container */
    border: 2px solid #ccc;
    border-radius: 8px;
    padding: 0; /* Remove default padding */
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    min-height: 100px;
    max-width: 300px;
    overflow: hidden; /* important to contain the image */
  }

  .image-node img {
    /* Make the image fill the node container */
    width: 100%;
    height: 100%;
    object-fit: contain; /* ensures the whole image is visible */
    display: block;
  }
</style>