<script lang="ts">
  import { teachingProjects as projects } from "$lib/data/teaching.js";
  import Tag from "$lib/blocks/Tag.svelte";
  import SecondaryTag from "$lib/blocks/SecondaryTag.svelte";
</script>

<div class="container">
  {#each projects as project}
    <div class="grid">
      <div class="left-column">
        <img src={project.thumbnail} alt={project.title} />
      </div>
      <div class="right-column sora-regular">
        
        <Tag>{project.tags.join(", ")}</Tag>
        <h2 class="sora-bold">{project.title}</h2>
        <div class="details">
          <p><strong>Location:</strong> {project.location}</p>
          <p><strong>Date:</strong> {project.date}</p>
          <p><strong>Duration:</strong> {project.duration}</p>
        </div>
        <p>
          <strong>Tools:</strong>
          {#each project.tools as tool}
            <SecondaryTag>{tool}</SecondaryTag>
          {/each}
        </p>

        <p class="description">{project.description}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 1rem;
    margin: auto;
    max-width: 900px;
    white-space: pre-line;
  }

  .left-column {
    flex: 1;
    margin-right: 1rem;
  }

  .right-column {
    flex: 1.7;
  }

  .grid {
    border: none;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
  }

  .grid:nth-child(even) {
    transform: translateX(200px);
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }

  .description {
    margin-top: 2rem;
  }

  .details p {
    margin: 0.2rem 0;
    font-size: 0.7875rem;
  }
</style>
