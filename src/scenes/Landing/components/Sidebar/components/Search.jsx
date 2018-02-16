import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import { searchArtist, getRelatedArtist } from 'services/network/api'

class Search extends Component {
  state = {
    artist: '',
    artistId: '',
    artists: [],
  }
  state_setArtist = ({ value: Artist }) =>
    this.setState(state => ({ ...state, artist }))

  render() {
    const { auth: { token_type, access_token }, getSearchProps } = this.props
    const { state_setRelatedArtists } = getSearchProps()
    const { artists, artist } = this.state
    return (
      <Autosuggest
        suggestions={artists}
        onSuggestionSelected={(value, { suggestion: { id } }) => {
          getRelatedArtist({ id, token_type, access_token })
            .then(res => {
              if (res.ok) {
                return res.json()
              } else {
                throw new Error('Error')
              }
            })
            .then(({ artists }) => state_setRelatedArtists(artists))
            .catch(() => {
              //handle error
            })
        }}
        onSuggestionsFetchRequested={obj => {
          searchArtist({ artist, token_type, access_token })
            .then(res => {
              if (res.ok) {
                return res.json()
              } else {
                throw new Error('Error')
              }
            })
            .then(({ artists: { items: artists } }) =>
              this.setState(state => ({ ...state, artists }))
            )
            .catch(() => {
              //handle error
            })
        }}
        onSuggestionsClearRequested={() => {}}
        getSuggestionValue={({ name }) => name}
        inputProps={{
          placeholder: 'search',
          onChange: ({ target }, { newValue: artist }) =>
            this.setState(state => ({ ...state, artist })),
          value: this.state.artist,
          className: 'capitalize text-3xl font-bold bg-grey-lighter p-4',
        }}
        renderSuggestion={({ name }) => <div className="">{name}</div>}
        shouldRenderSuggestions={() => true}
      />
    )
  }
}

export default Search
