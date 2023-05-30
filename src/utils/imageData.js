import findPlaylist  from "./guide-images/find-playlist.png";
import getPlaylistURL from './guide-images/get-playlist-url.png'
import searchPlaylistURL from './guide-images/search-playlist-url.png'
import createPlaylist from './guide-images/create-playlist.png'
import playlistCreationConfirmation from './guide-images/playlist-creation-confirmation.png'

export const images = [
    {
        id: 0,
        name: "Find playlist to clone",
        imgurl: findPlaylist,
    },
    {
        id: 1,
        name: 'Retrieve Playlist URL',
        imgurl: getPlaylistURL,
    },
    {
        id: 2,
        name: "Search Playlist URL on website",
        imgurl: searchPlaylistURL,
    },
    {
        id: 3,
        name: "Add new playlist name + description",
        imgurl: createPlaylist,
    },
    {
        id: 4,
        name: "New private playlist has been created!",
        imgurl: playlistCreationConfirmation,
    },
];