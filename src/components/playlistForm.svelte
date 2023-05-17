<script>
    import {user, accessToken, songs_uri_arr} from '../utils/store'

    export let newPlaylistName = '';
    export let newPlaylistDescription = '';
    export let newPlaylistScope = '';
    export let newPlaylistScopeOptions = [
        'Private',
        'Public',
    ];

    const submitForm = async () => {
        const token = $accessToken
        const user_id = $user["id"]
        const arr = $songs_uri_arr
        const response = await fetch(`/api/playlist?name=${newPlaylistName}&scope=${newPlaylistScope}&desc=${newPlaylistDescription}&user=${user_id}&token=${token}&uri=${arr}`, 
        {
            method: 'POST'
        }).then(data => data.json()).then(() => alert('Playlist created successfully! Reload your Spotify app.'))
    }
</script>

<h1 class="create-title">Create Your Playlist</h1>

<div class="form-container">
    <form>
        <input type="text" id = "newPlaylistName" placeholder="Give your playlist a name" bind:value={newPlaylistName}>
        <input type="text" placeholder="How about a description? (Optional)" bind:value={newPlaylistDescription}><br>
        <div class="radio-container">
            <h3>Make playlist private or public?</h3>
            {#each newPlaylistScopeOptions as option}
                <label>
                    <input type="radio" value={option} bind:group={newPlaylistScope}>{option}
                </label>
            {/each}
        </div>
        <div class='submit-container'>
            <button type="submit" on:click|preventDefault={submitForm}>Create</button>
        </div>
    </form>
</div>

<style>
    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input[type="radio"] {
        margin-right: 10px;
        border: 4px solid white;
        transform: scale(1.25);
        accent-color: rgb(176, 55, 182);
        font-size: 17px;
    }

    .submit-container 
    {
        margin-bottom: 2rem;

    }

    .radio-container 
    {
        width: 100%;
        margin-bottom: 2rem;
    }


    .create-title {
        color: #1db954;
        width: 100%;
    }

    label {
        font-weight: 600;
        font-size: 17px;
        padding: 12px;

    }
    input[type="text"] {
        flex: 1;
        width: 80%;
        margin-bottom: 2rem;
        padding: 12px;
        font-size: 17px;
        border: 4px solid transparent;
        border-radius: 3px;
        font-weight: 600;
    }

    input[type="text"]:focus {
        border: 4px solid rgb(176, 55, 182);
        outline: none;
    }

    button {
        padding: 14px;
        font-size: 17px;
        color: white;
        background-color: #1DB954;
        outline: none;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        width: 120px;
        margin: auto;
    }


    button:hover {
        background-color: rgb(176, 55, 182);
    }

</style>