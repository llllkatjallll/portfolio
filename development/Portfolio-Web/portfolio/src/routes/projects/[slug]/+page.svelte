<!-- src/routes/projects/[slug]/+page.svelte -->
<script>
  import HeroImageBlock from '$lib/blocks/HeroBlock.svelte';
  import TextBlock from '$lib/blocks/TextBlock.svelte';

  export let data;
  const { project } = data;

  const blockComponents = {
    hero: HeroImageBlock,
    text: TextBlock
  };
</script>



{#each project.blocks as block}
  {#if blockComponents[block.type]}
    <svelte:component this={blockComponents[block.type]} {...block.data} />
  {/if}
{/each}