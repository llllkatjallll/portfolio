<script lang="ts">
  import "../global.css";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  // State to toggle between classic and board view
  let isBoardView = $state(false);




  function toggleView() {
       isBoardView = !isBoardView;
    if (isBoardView) {
      goto(`/board`);
    } else {
      goto(`/projects`);
    }
  }
</script>

<div class="app">
  <div class="header">
    <a href="/">About</a>
    <a href="/projects">Projects</a>
    <a href="/teaching">Teaching</a>
    <a href="/contact">Contact</a>


    <label class="flex cursor-pointer gap-2">
      <span class="label-text">Classic</span>
      <input 
        type="checkbox"
        value="synthwave"
        class="toggle theme-controller"
        onchange={toggleView}
      />
      <span class="label-text">Board</span>
    </label>
  </div>
  <main>
    {@render children?.()}
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  main {
    position: relative;
    flex: 1 1 auto;
    flex-flow: column;
    display: flex;
  }

  .header {
    position: sticky;
    top: 0.7em;
    z-index: 999;

    display: flex;
    justify-content: end;
    padding: 1rem;
    background: #ffffff35;
    border-radius: 50px;

    margin-bottom: 1em;
  }
  .header a {
    margin: 0 1rem;
    font-weight: bold;
  }
</style>
