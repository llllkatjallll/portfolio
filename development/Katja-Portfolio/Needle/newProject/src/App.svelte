<script lang="ts">
    import NeedleEngine from "./NeedleEngine.svelte";

</script>

<!-- <NeedleEngine></NeedleEngine> -->

<!-- Header with links to other pages -->
<header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <nav>
        <a href="#/">About me</a>
        <a href="#/projects">Projects</a>
        <a href="#/about">Teaching</a>
      </nav>
</header>

<style>
    header {
        position: fixed;
        top: 0;
        
        right: 0;
        padding: 30px;
        z-index: 1000;
    }

    nav a {
        margin-right: 20px;
        color: rgb(0, 0, 0);
        text-decoration: none;
        font-size: 20px;
    }

    nav a:hover {
        text-decoration: underline;
    }
</style>