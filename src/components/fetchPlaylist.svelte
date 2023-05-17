<script>
    export let id = '';
    let lastSearchedId = '';
    import { accessToken, songs_uri_arr } from "../utils/store";
    import PlaylistLayout from "./playlistLayout.svelte";
    import { playlist } from "../utils/store";
    import { onMount } from "svelte";

    onMount(() => 
        {
            lastSearchedId = id;
        })

    export const fetchPlaylist = async () => 
    {

        const token = $accessToken;
        const playlistObject = await fetch(`/api/playlist?token=${token}&id=${id}`)
        const list = await playlistObject.json();
        $playlist = list;

        let songs = $playlist.tracks.items;

        for (let x = 0; x < songs.length; ++x)
        {
            let song = songs[x]
            let uri = song.track.uri
            $songs_uri_arr.push(uri)
        }

        console.log($songs_uri_arr)
    }

    $: if (id.length > 0) 
    {
        if (lastSearchedId !== id)
        {
            lastSearchedId = id
            fetchPlaylist()
        }
        else {
            alert('Lmao')
        }
    }

</script>


{#if Object.keys($playlist).length === 0}
    <div></div>
    {:else}
    <PlaylistLayout>
        
    </PlaylistLayout>
{/if}
