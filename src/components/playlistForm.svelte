<script>
    import {user, accessToken, songs_uri_arr} from '../utils/store'

    export let newPlaylistName = '';
    export let newPlaylistDescription = '';
    export let newPlaylistScope = '';
    export let newPlaylistScopeOptions = [
        'Public',
        'Private'
    ];
    const submitForm = async () => 
    {
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
        <input type="text" placeholder="How about a description? (Optional)" bind:value={newPlaylistDescription}>
        <h3>Make playlist private or public?</h3>
        <div class="radio-container">
            {#each newPlaylistScopeOptions as option}
            <div class="radio-item">
                <input type="radio" value={option} bind:group={newPlaylistScope} id={option}>
                <label for={option}>{option}</label>
            </div>
            {/each}
        </div>
        <div class="button-container">
            <button type="submit" on:click|preventDefault={submitForm}>Create</button>
        </div>
    </form>
</div>

<style>

.form-container 
{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
}

.radio-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin: auto;
    flex-wrap: wrap;
    margin-bottom: 12px;
    
}

.radio-item {
    flex: 1;
    padding: 6px;
}

.radio-item label {
    font-size: 18px;
    font-weight: 600;
}

input[type='radio'] 
{
  position: absolute;
  transform: translateX(-30px);
  height: 50px;
  width: 50px;
  border: 12px solid #1DB954;
  padding: 16px;
  content: "";
  accent-color: #1db954;

}

.create-title {
     color: #1db954;
     width: 100%;
}

input[type="text"] {
        flex: 1;
        width: 70%;
        margin-bottom: 26px;
        padding: 10px;
        font-size: 17px;
        border: 4px solid transparent;
        border-radius: 3px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
}

input[type="text"]:focus {
        border: 4px solid rgb(176, 55, 182);
        outline: none;
}

button {
        padding: 12px;
        font-size: 16px;
        color: white;
        background-color: #1DB954;
        outline: none;
        border: none;
        border-radius: 3px;
        font-weight: 600;
        width: 100px;
        margin: auto;
        font-family: 'Montserrat', sans-serif;
}


button:hover {
    background-color: rgb(176, 55, 182);
}

.button-container {
    width: 50%;
    margin: auto;
    margin-bottom: 10px;
}


</style>