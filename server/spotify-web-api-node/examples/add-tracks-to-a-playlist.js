var SpotifyWebApi = require("../");

/**
 * This example demonstrates adding tracks to a specified position in a playlist.
 *
 * Since authorization is required, this example retrieves an access token using the Authorization Code Grant flow,
 * documented here: https://developer.spotify.com/spotify-web-api/authorization-guide/#authorization_code_flow
 *
 * Codes are given for a set of scopes. For this example, the scopes are playlist-modify-public.
 * Scopes are documented here:
 * https://developer.spotify.com/spotify-web-api/using-scopes/
 */

/* This code is hardcoded. For a working implementation, the code needs to be retrieved from the user. See documentation about
 * the Authorization Code flow for more information.
 */
var authorizationCode = 'BQA8fieyZ9Jle_oz4igNwEjPyZot-AyIKD6psUgugo2CMs8fEPBgDIRlesMnBh4VvrKejek9yJ0J0Hk1uOlLXP8Z2vWm7kM-vFf5HFUUWBl619uwkdS6QqU9foiMoiBB7gSi1Kl0EsnOUAvvEs0jAs2f9UwvmwE';

/**
 * Set the credentials given on Spotify's My Applications page.
 * https://developer.spotify.com/my-applications
 */
var spotifyApi = new SpotifyWebApi({
  clientId : 'ab85096602544cd1a072309a632747ff',
  clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri : 'http://localhost:8888/callback'
});

// First retrieve an access token
spotifyApi.authorizationCodeGrant(authorizationCode)
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['BQA8fieyZ9Jle_oz4igNwEjPyZot-AyIKD6psUgugo2CMs8fEPBgDIRlesMnBh4VvrKejek9yJ0J0Hk1uOlLXP8Z2vWm7kM-vFf5HFUUWBl619uwkdS6QqU9foiMoiBB7gSi1Kl0EsnOUAvvEs0jAs2f9UwvmwE']);
    return spotifyApi.addTracksToPlaylist('Tristan Beauregard-Choquette, '5ieJqeLJjjI8iJWaxeBLuK', ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"],
      {
        position : 10
      })
  }).then(function(data) {
    console.log('Added tracks to the playlist!');
  }).catch(function(err) {
    console.log('Something went wrong!', err.message);
  });
