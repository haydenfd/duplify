// defines stores for shared variables
import { writable } from "svelte/store";
import { browser } from "$app/environment";

const defaultToken = null;
const initialToken = browser? window.localStorage.getItem('accessToken') ?? defaultToken : defaultToken;

export const accessToken = writable(initialToken)
accessToken.subscribe((value) => {
    if (browser)
    {
        window.localStorage.setItem('accessToken', value)
    }
});



export let user = writable({});
export let playlist = writable({});
export let songs_uri_arr = writable([]);
export let userOptions = writable({});


/* 
user - object for authorized user. Ref in  
*/