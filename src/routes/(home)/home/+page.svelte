<script>
    import { user,accessToken, playlist, songs_uri_arr} from '../../../utils';
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


    export let newPlaylistName='';
    export let newPlaylistDescription='';

    const handleSubmit = () => {
        submitForm()
    }

    const submitForm = async () => 
    {
        const token = $accessToken
        const user_id = $user["id"]
        const arr = $songs_uri_arr
        const response = await fetch(`/api/playlist?name=${newPlaylistName}&scope=Public&desc=${newPlaylistDescription}&user=${user_id}&token=${token}&uri=${arr}`, 
        {
            method: 'POST'
        }).then(data => data.json()).then(() => alert('Playlist created successfully! Reload your Spotify app.'))
    }

</script>

{#if visible}

<div class="home-container">
    <h1 class="user-intro-title">Hey <h1 class="user-display-name">{name}</h1>, what playlists do you want to clone today?</h1>
    <div class="form-container">
        <input type="text" placeholder="Enter Playlist URL" bind:value={urlSearchInput} id="input-url" class="search-url"/>
        <button on:click|preventDefault={() => fetchPlaylistFromSearch(urlSearchInput)} class="search-button">Retrieve Playlist</button>
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
    <!-- <Playlistform name={playlist_name} owner={playlist_owner} length={playlist_length}/> -->
    <div class="playlist-form-container">
    <div class="playlist-info-container">
        <h1 class="form-title">About playlist</h1>
        <h3 class="form-h3">{playlist_name}</h3>
        <h3 class="form-h3">{playlist_owner}</h3>
        <h3 class="form-h3">{playlist_length} songs</h3>
    </div>
    <div class="create-playlist-container">
        <h1 class="form-title">Create your playlist</h1>
        <input type="text" placeholder="Give your playlist a name"  bind:value={newPlaylistName} class="input-text"/>
        <input type="text" placeholder="Description? (optional)" bind:value={newPlaylistDescription} class="input-text"/>
        <button type="submit" on:click|preventDefault={handleSubmit} class="input-button">Create</button>
    </div>
</div>
{/if}
{/if}

<style>

    .home-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .user-intro-title {
        font-size: 28px;
        margin-top: 40px;
    }

    .user-display-name {
        display: inline;
        color:#1DB954;
        transition: all 0.28s ease-in-out;
        font-size: 28px;
        margin-top: 40px;
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

    .search-url {
        padding: 10px;
        border: 4.5px solid transparent;
        outline: none;
        border-radius: 8px;
        width: 60%;
        font-weight: 600;
        font-size: 18px;
        font-family: 'Montserrat', sans-serif;
    }

    .search-url:focus {
        border: 4.5px solid rgb(176, 55, 182);
    }

    .search-button {
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

    .search-button:hover {
        background-color: rgb(176, 55, 182);
    }

    .playlist-form-container {
        border-radius: 16px;
        background-color: black;
        color:white;
        width: 60%;
        display: flex;
        flex-direction: row;
        margin-top: 40px;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }

    .playlist-info-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
    }

    .create-playlist-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        border-left: 2px solid darkgray;
    }

    .form-title {
        font-size: 24px;
        color: #1DB954;
    }

    .form-h3 {
        font-size: 22px;
    }

    .input-text {
        margin: 15px auto;
        width: 80%;
        border-radius: 4px;
        padding: 8px;
        outline: none;
        font-size: 16px;
        border: 3px solid transparent;
        font-family: 'Montserrat';
        font-weight: 700;
    }

    .input-text:focus {
        border: 3px solid rgb(176, 55, 182);
    }

    .input-button {
        color: white;
        transition: all 0.3s ease-in-out;
        background-color: #1DB954;
        padding: 12px;
        font-weight: 700;
        border: 2px solid transparent;
        margin: 20px auto 20px auto;
        outline: none;
        width: 120px;
        font-size: 18px;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Montserrat';
    }

    .input-button:hover {
        background-color: rgb(176, 55, 182) ;
    }




</style>