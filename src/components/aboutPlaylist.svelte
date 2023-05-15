<script>
    import { playlist } from "../utils/store";
    console.log($playlist);

  
</script>

<h1 class="about-title">
    About this playlist
</h1>

<h2>{$playlist.name}</h2>
<h2>{$playlist.owner.display_name}</h2>
<h2>{$playlist.tracks.items.length} songs</h2>


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