import { redirect } from '@sveltejs/kit';
import {ENDPOINTS} from '../../../utils/spotify_endpoints';
import {generateRandomString} from '../../../utils/misc'; 
import dotenv from 'dotenv';
dotenv.config();

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
    const id = process.env['CLIENT_ID']
    const redirect_uri = process.env['REDIRECT_URI']
    const AUTH_ENDPOINT = `${ENDPOINTS.oauthAuthorizationURL}?response_type=${RESPONSE_TYPE}&state=${STATE}&client_id=${id}&scope=${SCOPE}&redirect_uri=${redirect_uri}`
    throw redirect(307, AUTH_ENDPOINT)
}