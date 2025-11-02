<script lang="ts">
    let { content, img, description } = $props();
</script>

<div class="container">
    <div class="hero-image">
        <img src={img} alt="" />
    </div>
    
    <div class="info">
        <h1>{content}</h1>
        <p>{description}</p>
    </div>
</div>

<!-- -->

<style>

    .container {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100vw;
        overflow: hidden;
    }
    
    .info {
        margin: 20px 40px;
    }

    .hero-image {
        position: relative;
        text-align: center;
        color: white;
        overflow: hidden;
        width: 100%;
        max-height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .hero-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
    }

    h1 {
        font-size: 2.5rem;
        color: #000000;
    }

    p {
        font-size: 1.2rem;
        color: #000000;
    }
</style>
