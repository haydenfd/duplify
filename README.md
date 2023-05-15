## API Endpoint Design 
- auth     - for redirecting to Spotify Auth page. 
- redirect - for requesting access token after getting auth code from Spotify. 
- me       - for fetching current user's profile. 
- playlist - for looking up a certain playlist ID and retrieving its info. 
           - for creating a new playlist to user's profile. 


## UI Design

- +layout.svelte helps modularize a lot of the UI. Applies to every child route and every sibling route, but not the parent route. 
- Same time, need to have a nav that appears in all of the components but the landing page. 
- pages needed - login, home, about, account(?) 

src/routes/
- +page.svelte
