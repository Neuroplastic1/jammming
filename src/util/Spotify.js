const clientId = process.env.REACT_APP_Jamming_ClientID
const redirectUri = 'http://JammmingSpotifyPlaylist.surge.sh';

let accessToken;
// Spotify module
// check for users access token 12 -> 15
// .match() method to retrieve the access token and expiration time from the URL. 17 -> 18 (implicit grant flow)
// Set the access token to expire accessToken = '' at the value for expiration time 25
// Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired 25
const Spotify = {

    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];

            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = redirectUrl;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
        }).then(response => {
            //console.log(response.json());
            return response.json();
        }).then(response => {
            if (!response.tracks) {
                return [];
            }
            return response.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview: track['preview_url']
            }));
        });
    },
    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me',
        {
              headers: {
              Authorization: `Bearer ${accessToken}`
        }
        }).then(response => response.json())
          .then(response => {
                userId = response.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                })
          .then(response => response.json())
          .then(response => {
                const playlistID = response.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            })
        });
    }

};

export default Spotify;
