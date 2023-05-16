<script>
    import { playlist } from "../utils/store";
</script>

<h1 class="about-title">
    About this playlist
</h1>

<h2>Playlist name: {$playlist.name}</h2>
<h2>Playlist owner: {$playlist.owner.display_name}</h2>
<h2>Playlist length: {$playlist.tracks.items.length} songs</h2>


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
</style>