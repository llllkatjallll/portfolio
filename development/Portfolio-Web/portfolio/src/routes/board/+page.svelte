<script lang="ts">
  import {
    SvelteFlow,
    Background,
    BackgroundVariant,
    Controls,
  } from "@xyflow/svelte";
  import "@xyflow/svelte/dist/style.css";
  import ImageNode from "../../components/flow-elements/ImageNode.svelte";
  import Postit from "../../components/flow-elements/Postit.svelte";

  const nodeTypes = {
    imageNode: ImageNode,
    postit: Postit,
  };

  let nodes = $state.raw([
    {
      id: "1",
      type: 'default',
      position: { x: 0, y: 200 },
      data: { label: "Hello" },
    },
    {
      id: "2",
      position: { x: 100, y: 300 },
      data: { label: "World" },
    },
    {
      id: "3",
      type: "imageNode",
      position: { x: 300, y: 300 },
      data: { imageUrl: "/images/projects/project-1/1_0_header_4.png" },
    },
    {
      id: "4",
      type: "postit",
      position: { x: 500, y: 100 },
      data: { text: "This is a post-it note!", color: "purple" },
    },
  ]);

  let edges = $state.raw([{ id: "e1-2", source: "1", target: "2" }]);
</script>

<SvelteFlow bind:nodes bind:edges fitView {nodeTypes} >
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
