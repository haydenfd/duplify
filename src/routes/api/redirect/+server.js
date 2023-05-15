import { CLIENT_ID, REDIRECT_URI, CLIENT_SECRET} from '$env/static/private';
import { json } from '@sveltejs/kit'
import {ENDPOINTS} from '../../../utils/spotify_endpoints';

const HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
};


/** @type {import('./$types').RequestHandler} */

export async function POST({url}) {

    const code = url.search.substring(1)
    const BODY =`code=${code}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`


    const res = await fetch(ENDPOINTS.accessTokenURL, {
        method: "POST",
        headers: HEADERS,
        body: BODY,
    }).then((response) => response.json())

    return json(res)
}



  // Make POST request to fetch access token
  /* 

    endpoint URL: https://accounts.spotify.com/api/token

    body params: 
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
    
    headers:
        Authorization: Basic <base64 encoded client_id:client_secret>,
        Content-Type: application/x-www-form-urlencoded,
  */