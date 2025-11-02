<script>
    import NeedleEngine from "../components/NeedleEngine.svelte";
</script>

<div class="cols">

      <h1 class="text-3xl font-bold underline ">
    Welcome to my portfolio!
  </h1>

  <label class="flex cursor-pointer gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
  <input type="checkbox" value="synthwave" class="toggle theme-controller" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</label>
   <!--  <NeedleEngine />

    <div class="intro">
        <h1>Needle 💚 Sveltekit</h1>
        <h2 class="subtitle">
            This is an example page built with <a href="https://kit.svelte.dev/"
                >Sveltekit</a
            >
            and <a href="https://needle.tools">Needle&nbsp;Engine</a>
        </h2>
        <p>
            You can use this as a starting point for building your own Needle
            Engine experiences with Sveltekit.
        </p>
        <p>
            Find the repository <a
                href="https://github.com/needle-engine/sveltekit-sample"
                >here on github</a
            >. 
            The repository is setup to be automatically built and deployed too
            with Github Actions 😊
        </p>
    </div> -->
</div>

<style>
    .cols {
        display: flex;
        flex-flow: row;
        justify-content: center;
        flex: 1 1 auto;
    }
    .intro {
        max-width: 500px;
        margin: 2em;
    }
    @media (max-width: 1100px) {
        .cols {
            flex-flow: column;
        }
        .intro {
            margin: 1em;
        }
    }
</style>
