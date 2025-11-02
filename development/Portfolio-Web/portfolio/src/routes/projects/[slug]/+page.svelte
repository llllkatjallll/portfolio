<!-- src/routes/projects/[slug]/+page.svelte -->
<script lang="ts">
  import HeroImageBlock from '$lib/blocks/HeroBlock.svelte';
  import TextBlock from '$lib/blocks/TextBlock.svelte';

  let { data } = $props();
  const { project } = data;

  const blockComponents = {
    hero: HeroImageBlock,
    text: TextBlock
  };
</script>



{#each project.blocks as block}
  {#if blockComponents[block.type]}
    {@const SvelteComponent = blockComponents[block.type]}
    <SvelteComponent {...block.data} />
  {/if}
{/each}