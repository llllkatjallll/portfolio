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
  import { projects } from "../../lib/data/projects.js";

  const nodeTypes = {
    imageNode: ImageNode,
    postit: Postit,
  };
  const initialNodes: any[] = [];
  const initialEdges: any[] = [];

  projects.forEach((project, index) => {
    const heroBlock = project.blocks.find((b) => b.type === "hero");
    if (heroBlock) {
      const imageNodeId = `img-${project.slug}`;
      const postitNodeId = `postit-${project.slug}`;

      initialNodes.push({
        id: imageNodeId,
        type: "imageNode",
        position: { x: index * 650, y: 100 },
        data: { imageUrl: heroBlock.data.img },
      });

      initialNodes.push({
        id: postitNodeId,
        type: "postit",
        position: { x: index * 650, y: 450 },
        data: { text: heroBlock.data.content, color: "yellow" },
      });

      initialEdges.push({
        id: `e-${imageNodeId}-${postitNodeId}`,
        source: imageNodeId,
        target: postitNodeId,
      });
    }
  });

  let nodes = $state.raw(initialNodes);

  let edges = $state.raw(initialEdges);
</script>

<SvelteFlow bind:nodes bind:edges fitView {nodeTypes}>
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
