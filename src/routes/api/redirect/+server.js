import { json } from '@sveltejs/kit'
import {ENDPOINTS} from '../../../utils';
import dotenv from 'dotenv';
dotenv.config();

const HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + (new Buffer.from(process.env['CLIENT_ID'] + ':' + process.env['CLIENT_SECRET']).toString('base64'))
};


/** @type {import('./$types').RequestHandler} */
export async function POST({url}) {

    const code = url.search.substring(1)
    const BODY =`code=${code}&redirect_uri=${process.env['REDIRECT_URI']}&grant_type=authorization_code`


    const res = await fetch(ENDPOINTS.accessTokenURL, {
        method: "POST",
        headers: HEADERS,
        body: BODY,
    }).then((response) => response.json())

    return json(res)
}


