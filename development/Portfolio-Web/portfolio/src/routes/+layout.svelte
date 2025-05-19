<script lang="ts">
    import "../global.css";
    import { base } from "$app/paths";
</script>

<div class="app">
    <div class="header">
        <a href="{base}/">About</a>
        <a href="{base}/projects">Projects</a>
        <a href="{base}/teaching">Teaching</a>
        <a href="{base}/contact">Contact</a>
      
    </div>
    <main>
        <slot />
    </main>
</div>

<style>
    .app {
        display: flex;
        flex-flow: column;
        height: 100%;
        padding: 1.5em;
    }

    main {
        position: relative;
        flex: 1 1 auto;
        flex-flow: column;
        display: flex;
    }

    .header {
        position: sticky;
        top: .7em;
        z-index: 999;

        display: inline-block;
        padding: 1rem;
        background: #ffffff;
        border-radius: 50px;
       
        margin-bottom: 1em;
    }
    .header a {
        margin: 0 1rem;
        font-weight: bold;
    }
</style>
