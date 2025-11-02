<script lang="ts">
  import {
    SvelteFlow,
    Background,
    BackgroundVariant,
    Controls,
  } from "@xyflow/svelte";
  import "@xyflow/svelte/dist/style.css";
  import ImageNode from "../../components/flow-elements/ImageNode.svelte";

  let nodes = $state.raw([
    {
      id: "1",
      position: { x: 0, y: 200 },
      data: { label: "Hello" },
    },
    {
      id: "2",
      position: { x: 100, y: 300 },
      data: { label: "World" },
    },
  ]);

  let edges = $state.raw([{ id: "e1-2", source: "1", target: "2" }]);
</script>

<SvelteFlow bind:nodes bind:edges fitView >
  <Background
    patternColor="#4fe870"
    bgColor="#fafafa"
    variant={BackgroundVariant.Lines}
    gap={100}
  />
  <h1>Board</h1>
  <Controls />
</SvelteFlow>

<style>
  h1 {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    color: #333;
  }
</style>
