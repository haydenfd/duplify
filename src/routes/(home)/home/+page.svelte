<script>
    import { user,accessToken } from '../../../utils';
    import { onMount } from 'svelte';

    $: name = $user.display_name
    
    // this never runs apparently. fix this
    $ : (() => {
        if (!$user)
        {
            fetchUser()
        }
    })

    let visible = false


    const fetchUser = async () => 
    {
        let token = $accessToken;

        $user = await fetch(`api/me?token=${token}`)
        .then((response) => response.json())

        visible = true
    }


    onMount(() => {
        if (name === undefined)
        {
            fetchUser()
        }

        else {
            visible = true;
        }
    })

</script>

{#if visible}
<h1>{name}</h1>
<!-- <div class="title" in:fly="{{ y: -200, duration: 2200 }}" out:fade="{{delay: 500,duration: 800}}">
    <h1>Hey <h1 class="user-display-name">{name}
    </h1>, what playlists do you want to clone today?</h1>
</div>

<div class="form-container" in:fly="{{ y: -200, duration: 2200, delay: 800}}" out:fade="{{delay: 200,duration: 1000}}">
    <input type="text" placeholder="Enter Playlist URL" bind:value={urlSearchInput} id="input-url">
    <button on:click|preventDefault = {() => parseUrlForPlaylistId(urlSearchInput)}>Retrieve Playlist</button>
</div>

<FetchPlaylist id={playlistID}/> -->
{/if}

<style>

</style>