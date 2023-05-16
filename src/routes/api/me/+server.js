import { json } from "@sveltejs/kit";
import { ENDPOINTS } from "../../../utils/spotify_endpoints";

/** @type {import('./$types').RequestHandler} */
export async function GET({url})
{

    const accessToken = url.searchParams.get('token');

    const res = await fetch(ENDPOINTS.getMeURL, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then((response) => response.json())
    
    return json(res)
}


  // const token = url.searchParams.get('token');
    // const HEADERS = {
    //     'Authorization': 'Bearer ' + token, 
    // }
    // const res = await fetch(ENDPOINTS.getMeURL, {
    //     method: "GET",
    //     headers: HEADERS,
    // }).then((response) => response.json())

    // return json(res)