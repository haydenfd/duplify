<script>
    import { user,accessToken, playlist, songs_uri_arr} from '../../../utils';
    import Playlistform from '../../../components/playform.svelte'
    import { onMount } from 'svelte';
    import { browser } from "$app/environment";

    $: name = $user.display_name
    export let urlSearchInput = '';
    export let playlistID = ''; 
    let playlistVisible = false;
    // export let lastSearchedID = '';
    
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

    let playlist_name = '';
    let playlist_owner = '';
    let playlist_length = '';

    const fetchPlaylistFromSearch = async (urlSearchInput) => 
    {
    const regexPattern = /^https:\/\/open\.spotify\.com\/playlist\/(\w{22})/
    const matchedId = urlSearchInput.match(regexPattern)

    if (matchedId)
    {
        playlistID = matchedId[1]
        const token = $accessToken;
        const playlistObject = await fetch(`/api/playlist?token=${token}&id=${playlistID}`)
        const list = await playlistObject.json();
        $playlist = list;

        let songs = $playlist.tracks.items;
        console.log($playlist)
        playlist_name = $playlist.name
        playlist_owner = $playlist.owner.display_name
        playlist_length = $playlist.tracks.total

        for (let x = 0; x < songs.length; ++x)
        {
            let song = songs[x]
            let uri = song.track.uri
            $songs_uri_arr.push(uri)
        }

        playlistVisible = true
        console.log($songs_uri_arr)
        
    }
    }

    const checkForToken = () => {
        if (browser)
        {
            if (window.sessionStorage.getItem("accessToken") === null)
            {
                return false
            }

            else {
                return true;
            }
        }
    }

    onMount(() => {
    
        if (!checkForToken)
        {
            window.location.href = '/login'
        }
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

<div class="home-container">
    <h1>Hey <h1 class="user-display-name">{name}</h1>, what playlists do you want to clone today?</h1>
    <div class="form-container">
        <input type="text" placeholder="Enter Playlist URL" bind:value={urlSearchInput} id="input-url"/>
        <button on:click|preventDefault={() => fetchPlaylistFromSearch(urlSearchInput)}>Retrieve Playlist</button>
    </div>
</div>
<!-- <div class="title" in:fly="{{ y: -200, duration: 2200 }}" out:fade="{{delay: 500,duration: 800}}">
    <h1>Hey <h1 class="user-display-name">{name}
    </h1>, what playlists do you want to clone today?</h1>
</div>

<div class="form-container" in:fly="{{ y: -200, duration: 2200, delay: 800}}" out:fade="{{delay: 200,duration: 1000}}">
    <input type="text" placeholder="Enter Playlist URL" bind:value={urlSearchInput} id="input-url">
    <button on:click|preventDefault = {() => parseUrlForPlaylistId(urlSearchInput)}>Retrieve Playlist</button>
</div>

<FetchPlaylist id={playlistID}/> -->
{#if playlistVisible}
    <Playlistform name={playlist_name} owner={playlist_owner} length={playlist_length}/>
{/if}
{/if}

<style>

    .home-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        font-size: 28px;
        margin-top: 40px;
    }

    .user-display-name {
        display: inline;
        color:#1DB954;
        transition: all 0.28s ease-in-out;
    }

    .user-display-name:hover {
        color: rgb(176, 55, 182);
    }

    .form-container {
        width: 70%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        gap: 5%;
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

    button {
        width: 20%;
        padding: 14px;
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


</style>