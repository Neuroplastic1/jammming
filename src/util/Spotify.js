const clientId = process.env.REACT_APP_Jamming_ClientID
const redirectUri = 'http://localhost:3000/';

let accessToken;
// check for users access token 11 -> 14
// .match() method to retrieve the access token and expiration time from the URL. 16 -> 17 (implicit grant flow)
// Set the access token to expire accessToken = '' at the value for expiration time 23
// Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired 24
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
console.log(expiresInMatch)
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
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview: track['preview_url']
            }));
        });
    }

};

export default Spotify;
