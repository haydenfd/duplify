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

<div class="form-container">
    <input type="text" placeholder="Enter Playlist URL" bind:value={urlSearchInput}>
    <button on:click|preventDefault = {() => parseID(urlSearchInput)}>Retrieve Playlist</button>
</div>

<FetchPlaylist id={playlistID}/>
<style>

    .title {
        margin-top: 30px;
        margin-bottom: 30px;
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
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        gap:5vw;
    }

    input[type="text"] {
        padding: 14px;
        border: 4.5px solid #4A4A4A;
        outline: none;
        border-radius: 8px;
        width: 60%;
        font-weight: 600;
        font-size: 18px;
    }

    input[type="text"]:focus {
        border: 4.5px solid rgb(176, 55, 182);
    }

    button {
        width: 20%;
        padding: 18px;
        background-color: #1DB954;
        border: none;
        outline: none;
        color: white;
        font-weight: 600;
        font-size: 18px;
        border-radius: 8px;
        transition: all 0.28s ease-in-out;
        cursor: pointer;
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