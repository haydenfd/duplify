export const ENDPOINTS = {

    oauthAuthorizationURL: 'https://accounts.spotify.com/authorize',
    accessTokenURL: 'https://accounts.spotify.com/api/token',
    getMeURL: 'https://api.spotify.com/v1/me/',
    getPlaylistURL: 'https://api.spotify.com/v1/playlists/',

}

export const createPlaylistEndpointGenerator = (user_id) => {
    const response = `https://api.spotify.com/v1/users/${user_id}/playlists`
    return response;
}