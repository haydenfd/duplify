<script>
    export let id = '';

    import { accessToken, songs_uri_arr } from "../utils/store";
    import PlaylistLayout from "./playlistLayout.svelte";
    import { playlist } from "../utils/store";

    const timesRetrieved = 0; 

    export const fetchPlaylist = async () => {
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
            console.log(uri)
        }

        console.log($songs_uri_arr)
    }

    $: if (id.length > 0) {
        fetchPlaylist();
    }

    $: if ($playlist.length > 0) {
        console.log("CHECK")
        let songs = $playlist.tracks.items;

        for (let x = 0; x < songs.length; ++x)
        {

            let song = songs[x]
            let uri = song.track.uri
            // console.log(typeof(songs_uri_arr))
        }
    }
    // $: if ($playlist ) {
    //         console.log('Fetched playlist')
    //         let songs = $playlist.tracks.items;

    //         for (let x = 0; x < songs.length; x++)
    //         {
    //             let song = songs[x]
    //             songs_uri_arr.push(song["track"]["uri"])
    //         }

    //         console.log(songs_uri_arr)
    //     }


</script>


{#if Object.keys($playlist).length === 0}
    <div></div>
    {:else}
    <PlaylistLayout>
        
    </PlaylistLayout>
    
{/if}


<style>

    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        background-color: dodgerblue;
        margin: auto;
        margin-top: 20px;
    }
</style>