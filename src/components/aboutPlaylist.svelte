<script>
    import { playlist } from "../utils/store";
</script>

<h1 class="about-title">
    About this playlist
</h1>

<h2>Playlist name: <h3> {$playlist.name}</h3></h2>
<h2>Playlist owner: <h3>{$playlist.owner.display_name}</h3></h2>
<h2>Playlist length: <h3>{$playlist.tracks.items.length} songs</h3></h2>


<style>
    .about-title 
    {
    color: #1db954;
    width: 100%;
    position: relative;
    margin-bottom: 2rem;
    }

    h2 {
    font-size: 24px;
    margin-bottom: 2rem;
    }

    h3 {
        display: inline;
        font-size: 24px;
        margin-bottom: 2rem;
        color: #1DB954;
    }
</style>