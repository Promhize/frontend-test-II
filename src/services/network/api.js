const baseURL = {
  spotify: 'https://api.spotify.com/v1/',
  giphy: 'https://api.giphy.com',
}

export const searchArtist = ({ artist, token_type, access_token }) =>
  fetch(
    `${baseURL.spotify}search?q=${encodeURIComponent(artist)}&type=artist`,
    {
      headers: {
        authorization: `${token_type} ${access_token}`,
      },
    }
  )

export const getRelatedArtist = ({ id, token_type, access_token }) =>
  fetch(
    `
  ${baseURL.spotify}artists/${id}/related-artists
`,
    {
      headers: {
        authorization: `${token_type} ${access_token}`,
      },
    }
  )

export const getArtistPopularSongs = ({ id, token_type, access_token }) =>
  fetch(
    `
  ${baseURL.spotify}artists/${id}/top-tracks?country=SE
`,
    {
      headers: {
        authorization: `${token_type} ${access_token}`,
      },
    }
  )

export const searchGifs = name =>
  fetch(`
  ${
    baseURL.giphy
  }/v1/gifs/search?api_key=oZCEGcUuKubCZE6qVeGszjCM9tQwX3nf&q=${name}&limit=5
`)
