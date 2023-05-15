<script>
    import { user, accessToken } from "../utils/store";
    import { onMount } from 'svelte';
    export let urlSearchInput = '';
    export let playlistID = ''; 
    import FetchPlaylist from "./fetchPlaylist.svelte";

    export const fetchMe = async () => {
        const token = $accessToken;
        const userObject = await fetch(`/api/me?token=${token}`)
        const list = await userObject.json();
        $user = list;
        console.log($user);
    }

    onMount(async () => {
		fetchMe();
	});
    

    const parseID = (urlSearchInput) => {
        const regex = /^https:\/\/open\.spotify\.com\/playlist\/(\w{22})/;
        const match = urlSearchInput.match(regex);
        if (match) {
            playlistID = match[1]
        } 
    }

    
</script>

<div class="title">
    <h1>Hey <h1 class="user-display-name">{$user.display_name}
    </h1>, what playlists do you want to clone today?</h1>
</div>

<div>
    <input type="text" placeholder="Enter Playlist URL" bind:value={urlSearchInput}>
    <button on:click|preventDefault = {() => parseID(urlSearchInput)}>Retrieve Playlist</button>
</div>

<FetchPlaylist id={playlistID}/>
<style>

    .title {
        margin-top: 45px;
        margin-bottom: 45px;
        width: 50%;
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

    input[type="text"] {
        padding: 16px;
        border: 3px solid #4A4A4A;
        outline: none;
        border-radius: 8px;
        font-size: 16px;
        width: 70%;
        font-weight: 600;
        font-size: 20px;
    }

    input[type="text"]:focus {
        border: 3px solid rgb(176, 55, 182);
    }

    button {
        width: 20%;
        padding: 18px;
        background-color: #1DB954;
        border: none;
        outline: none;
        color: white;
        font-weight: 600;
        font-size: 20px;
        border-radius: 8px;
        cursor: pointer;
    }

    button:hover {
        background-color: rgb(176, 55, 182);
    }

    h1 {
        font-size: 36px;
    }

    .user-display-name {
        display: inline;
        color:#1DB954;
    }

    .user-display-name:hover {
        color: rgb(176, 55, 182);
    }
</style>