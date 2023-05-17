<script>
    import Nav from "../../../components/nav.svelte";
    import { onMount } from "svelte";
    // import { fly } from "svelte/transition";
    let visible = false;

    //helps spam?
    let name = 'haydenfds'
    let host = 'gmail'
    let dom = 'com'

    onMount(() => {
    visible = true;
  });


    export const handleCopyLink = async () => 
{
    try 
    {
        const textToCopy = `${name}@${host}.${dom}`
        await navigator.clipboard.writeText(textToCopy).then(() => alert('Successfully copied the address!'))
    } 
    catch (e) 
    {
        alert('Oops! Couldn\'t copy to clipboard. Please try again.');
    }
}
</script>

{#if visible}
<Nav />
<div>
    <h1>About Duplify</h1>
    <p>
        Inserting explanation soon.
    </p>
    <p>I'm still working on the website and expanding its functionality. If you have any suggestions to improve this website, or want to know more about how I used the Spotify API, please feel free to reach out!
    <br><br/><a class="link" href="https://github.com/haydenfd/duplify" target="_blank">Here</a> is the link to the GitHub repository. Click <a href='#top' id="copy-link-btn" class="link" on:click|preventDefault={handleCopyLink}>here</a> to copy my email address to your clipboard.
    </p>
</div>
{/if}

<style>
    div {
        width: 75%;
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
        margin-top: 30px;
        font-size:18px;
        text-align: left;
        line-height: 160%;
        text-align: justify;
    }

    .link {
        display: inline-block;
        color: #1DB954;
        font-weight: 700;
    }


</style>