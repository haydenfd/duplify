// defines stores for shared variables

import { writable } from "svelte/store";

export const accessToken = writable(null);
export let user = writable({});
export let playlist = writable({});
export let songs_uri_arr = writable([]);
export let userOptions = writable({});


/* 
user - object for authorized user. Ref in  
*/