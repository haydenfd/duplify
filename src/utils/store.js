import { writable } from "svelte/store";
import { browser } from "$app/environment";

const defaultToken = null;
const initialToken = browser? window.sessionStorage.getItem('accessToken') ?? defaultToken : defaultToken;
export const accessToken = writable(initialToken)
accessToken.subscribe((value) => {
    if (browser)
    {
        window.sessionStorage.setItem('accessToken', value)
    }
});

export const user = writable({})

