<!-- <script>
    import {user, accessToken, songs_uri_arr} from '../utils'
    export let name='';
    export let owner='';
    export let length = '';


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

<div class="playlist-form-container">
    <div class="playlist-info-container">
        <h1>About playlist</h1>
        <h3>{name}</h3>
        <h3>{owner}</h3>
        <h3>{length} songs</h3>
    </div>
    <div class="create-playlist-container">
        <h1>Create your playlist</h1>
        <input type="text" placeholder="Give your playlist a name"  bind:value={newPlaylistName}/>
        <input type="text" placeholder="Description? (optional)" bind:value={newPlaylistDescription}/>
        <button type="submit" on:click|preventDefault={handleSubmit}>Create</button>
    </div>
</div>

<style>
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

    h1 {
        font-size: 24px;
        color: #1DB954;
    }

    h3 {
        font-size: 22px;
    }

    input[type="text"] {
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

    input[type="text"]:focus {
        border: 3px solid rgb(176, 55, 182);
    }

    button[type="submit"] {
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

    button[type="submit"]:hover {
        background-color: rgb(176, 55, 182) ;
    }

</style> -->