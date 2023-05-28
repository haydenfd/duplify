import { redirect } from '@sveltejs/kit';
import { generateRandomString, ENDPOINTS } from '../../../utils';
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


export function load() 
{
    const clientId = process.env['CLIENT_ID']
    const redirectUri = process.env['REDIRECT_URI']
    const authEndpoint = `${ENDPOINTS.oauthAuthorizationURL}?response_type=${RESPONSE_TYPE}&state=${STATE}&client_id=${clientId}&scope=${SCOPE}&redirect_uri=${redirectUri}`
    throw redirect(307, authEndpoint)
}