<script>
    import Nav from "../../../components/nav.svelte";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    let visible = true;
</script>

{#if visible}
<Nav />
<div transition:fly="{{ y: -200, duration: 2500 }}">
    <h1>About Duplify</h1>
    <p>...</p>
</div>
{/if}

<style>
    div {
        width: 70%;
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
    }

    h1 {
        font-size: 40px;
        text-align: center;
    }

    p {
        margin-top: 36px;
        font-size:18px;
        text-align: left;
    }
</style>