import { json } from "@sveltejs/kit";
import { ENDPOINTS } from "../../../utils";

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
