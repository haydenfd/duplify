import { redirect } from '@sveltejs/kit';
// import { VITE_CLIENT_ID, VITE_REDIRECT_URI} from '$env/static/private';
import {ENDPOINTS} from '../../../utils/spotify_endpoints';
import {generateRandomString} from '../../../utils/misc'; 

const RESPONSE_TYPE='code';
const STATE=generateRandomString();
const SCOPE=[
    "user-read-email", 
    "user-read-private", 
    "playlist-modify-public", 
    "playlist-modify-private"
    ].join("%20")


// 307 is temp redirect 
export function load() {
    const AUTH_ENDPOINT = `${ENDPOINTS.oauthAuthorizationURL}?response_type=${RESPONSE_TYPE}&state=${STATE}&client_id=${import.meta.env.VITE_CLIENT_ID}&scope=${SCOPE}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`
    throw redirect(307, AUTH_ENDPOINT)
}