<script lang="ts">
  import "../global.css";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  // State to toggle between classic and board view
  let isBoardView = $state(false);
  let currentRoute = "/";
  function toggleView() {
    if (!isBoardView) {
      currentRoute = window.location.pathname;
    }

    isBoardView = !isBoardView;

    if (isBoardView) {
      goto(`${base}/board`);
    } else {
      goto(`${base}${currentRoute}`);
    }
  }
</script>

<div class="app">
  <div class="header">
    <a href="{base}/">About</a>
    <a href="{base}/projects">Projects</a>
    <a href="{base}/teaching">Teaching</a>
    <a href="{base}/contact">Contact</a>

    <!-- Toggle classic/board view -->
    <button onclick={toggleView}>
      {isBoardView ? "Classic View" : "Board View"}
    </button>
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
