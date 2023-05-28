import { json } from "@sveltejs/kit";
import {ENDPOINTS} from '../../../utils'


export async function _addSongsToPlaylist(access_token, playlist_id, songs_uri_list)
{

    const addSongsEndpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
    let songsUriListDelimited = songs_uri_list.split(',')

    const res = await fetch(addSongsEndpoint, {
        method:"POST",
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(
            {
                "uris": songsUriListDelimited
            })
    }).then(
        (response) => response.json()).then(data => console.log(data))
  
} 

/** @type {import('./$types').RequestHandler} */
export async function GET({url})
{
    const accessToken = url.searchParams.get('token')
    const playlistId = url.searchParams.get('id')
    const getPlaylistEndpoint = `${ENDPOINTS.getPlaylistURL}${playlistId}`

    const res = await fetch(getPlaylistEndpoint, {
        method:"GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then((response) => response.json())

    return json(res)
}

/** @type {import('./$types').RequestHandler} */
export async function POST({url}) {

    let playlistName = url.searchParams.get('name')
    let playlistDescription = url.searchParams.get('desc')
    let playlistScope = url.searchParams.get('scope') === 'Private'? false : true
    let userAccountId = url.searchParams.get('user')
    let accessToken = url.searchParams.get('token') 
    let songsUriArray = url.searchParams.get('uri')

    const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userAccountId}/playlists`
    let newlyCreatedPlaylistID = null

    const res = await fetch(createPlaylistEndpoint, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
            name: playlistName,
            public: playlistScope,
            description: playlistDescription
        })
    }).then(
        response => response.json()
        ).then((data) => 
        {
        newlyCreatedPlaylistID = data.id
        _addSongsToPlaylist(accessToken, newlyCreatedPlaylistID, songsUriArray)
    })

    return json({"status":"200"})
}

