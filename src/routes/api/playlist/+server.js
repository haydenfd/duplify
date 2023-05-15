import { json } from "@sveltejs/kit";
import { ENDPOINTS } from "../../../utils/spotify_endpoints";
import { createPlaylistEndpointGenerator } from "../../../utils/spotify_endpoints";
import { songs_uri_arr } from "../../../utils/store";

/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {

    const token = url.searchParams.get('token')
    const id = url.searchParams.get('id')

    const HEADERS = {
        'Authorization': 'Bearer ' + token, 
    }

    const playlistEndpoint = `${ENDPOINTS.getPlaylistURL}${id}`
    const res = await fetch(playlistEndpoint, {
        method: "GET",
        headers: HEADERS,
    }).then((response) => response.json())
    // return json(res)
    return json(res)
}


/* TODO - Processing for playlists > 100 song, repeated calls needed */

/** @type {import('./$types').RequestHandler} */
export async function POST({url}) {
    let m_name = url.searchParams.get('name')
    let m_desc = url.searchParams.get('desc')
    let m_scope = url.searchParams.get('scope')
    let user_id = url.searchParams.get('user')
    let token = url.searchParams.get('token')
    let uri = url.searchParams.get('uri')

    if (m_scope == 'Private')
    {
        m_scope = false;
    }
    else {
        m_scope = true;
    }

    const endpoint = createPlaylistEndpointGenerator(user_id)

    const HEADERS = {
        'Authorization': 'Bearer ' + token, 
        'Content-Type': 'application/json'
    }

    const DATA = {
        "name": m_name,
        "description": m_desc,
        "public": m_scope,
    }

    let new_playlist_id = null;

    const res = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,
    {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: m_name,
            public: m_scope,
            description: m_desc
        })
    }).then(response => response.json()).then((d) => {
        new_playlist_id = d.id
        _addSongs(new_playlist_id, uri, token)
    })

    return json({"1": true})
}

export async function _addSongs(playlist_id, songs_arr, token) 
{
    const endpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
    songs_arr = songs_arr.split(',')
    console.log(typeof(songs_arr))
    console.log(Array.isArray(songs_arr))
    console.log(songs_arr[0])
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           "uris": songs_arr
        })

    }).then((response) => response.json()).then(d => console.log(d))
}