<script>
    import { user, accessToken } from "../utils/store";
    import { onMount } from 'svelte';
    export let urlSearchInput = '';
    export let playlistID = ''; 
    import FetchPlaylist from "./fetchPlaylist.svelte";
    import { fade, fly } from 'svelte/transition';
    let visible = false;
    let name = ''

    export const fetchUser = async () => 
    {
        let accessToken = $accessToken;

        $user = await fetch(`api/me?token=${accessToken}`)
        .then((response) => response.json())
        name = $user.display_name
        console.log($user)
    }

    onMount(async () => {
        fetchUser();
        visible = true;
	});

    const parseUrlForPlaylistId = (urlSearchInput) => 
    {
        const regexPattern = /^https:\/\/open\.spotify\.com\/playlist\/(\w{22})/
        const matchedId = urlSearchInput.match(regexPattern)

        if (matchedId)
        {
            playlistID = matchedId[1]
        }

        else {
            alert('Oops, that link is invalid. Try again with a different link, or visit the guide for help.')
        }
    }
    
</script>

{#if visible}
<div class="title" in:fly="{{ y: -200, duration: 2200 }}" out:fade="{{delay: 500,duration: 800}}">
    <h1>Hey <h1 class="user-display-name">{name}
    </h1>, what playlists do you want to clone today?</h1>
</div>

<div class="form-container" in:fly="{{ y: -200, duration: 2200, delay: 800}}" out:fade="{{delay: 200,duration: 1000}}">
    <input type="text" placeholder="Enter Playlist URL" bind:value={urlSearchInput} id="input-url">
    <button on:click|preventDefault = {() => parseUrlForPlaylistId(urlSearchInput)}>Retrieve Playlist</button>
</div>

<FetchPlaylist id={playlistID}/>
{/if}
<style>

    .title {
        margin-top: 20px;
        margin-bottom: 20px;
        width: 80%;
        text-align: center;
        display: flex;
        justify-content: center;
    }

    div {
        width: 50%;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: auto;
    }

    .form-container {
        width: 70%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        gap:5%;
    }

    input[type="text"] {
        padding: 12px;
        border: 4.5px solid #4A4A4A;
        outline: none;
        border-radius: 8px;
        width: 60%;
        font-weight: 600;
        font-size: 18px;
        font-family: 'Montserrat', sans-serif;
    }

    input[type="text"]:focus {
        border: 4.5px solid rgb(176, 55, 182);
    }

    /* .error-input {
        border: 4.5px solid red;
    } */

    button {
        width: 20%;
        padding: 15px;
        background-color: #1DB954;
        border: none;
        outline: none;
        color: white;
        font-weight: 600;
        font-size: 18px;
        border-radius: 7px;
        transition: all 0.28s ease-in-out;
        cursor: pointer;
        font-family: 'Montserrat', sans-serif;
    }

    button:hover {
        background-color: rgb(176, 55, 182);
    }

    h1 {
        font-size: 28px;
    }

    .user-display-name {
        display: inline;
        color:#1DB954;
        transition: all 0.28s ease-in-out;

    }

    .user-display-name:hover {
        color: rgb(176, 55, 182);
    }
</style>